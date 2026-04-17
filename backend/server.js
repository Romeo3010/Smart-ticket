require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const SECRET_KEY = process.env.JWT_SECRET || "votre_cle_secrete_super_secure_2026";

// Configuration CORS
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
app.use(express.json());

// --- CONFIGURATION DE L'UPLOAD D'IMAGES ---
// On définit le chemin vers le dossier public du frontend
const frontendImagePath = path.join(__dirname, '../frontend/public/images');

// Vérification si le dossier existe, sinon on le crée pour éviter l'erreur 500
if (!fs.existsSync(frontendImagePath)) {
    fs.mkdirSync(frontendImagePath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, frontendImagePath);
    },
    filename: (req, file, cb) => {
        // Nom de fichier unique pour éviter les doublons
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Accès statique aux images pour le serveur
app.use('/images', express.static(frontendImagePath));

// --- CONNEXION BASE DE DONNÉES ---
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'smart_ticket_db',
    waitForConnections: true,
    connectionLimit: 10
}).promise();

// ==========================================
// ROUTES ÉVÉNEMENTS
// ==========================================

// 1. CRÉER UN ÉVÉNEMENT (POST)
app.post('/api/events', upload.single('image'), async (req, res) => {
    try {
        const { title, description, date_event, location, price_standard, price_vip, stock_standard, stock_vip } = req.body;
        const image_url = req.file ? `/images/${req.file.filename}` : null;

        const sql = `INSERT INTO events 
            (title, description, date_event, location, price_standard, price_vip, stock_standard, stock_vip, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const values = [title, description, date_event, location, price_standard, price_vip, stock_standard, stock_vip, image_url];
        
        await db.query(sql, values);
        res.status(201).json({ success: true, message: "Événement créé avec succès !" });
    } catch (err) {
        console.error("Erreur POST:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. RÉCUPÉRER TOUS LES ÉVÉNEMENTS (GET)
app.get('/api/events', async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM events ORDER BY date_event ASC");
        res.json(results);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// 3. RÉCUPÉRER UN ÉVÉNEMENT PAR ID (GET)
app.get('/api/events/:id', async (req, res) => {
    try {
        const cleanId = req.params.id.split(':')[0]; // Nettoie l'ID si format "5:1"
        const [results] = await db.query("SELECT * FROM events WHERE id = ?", [cleanId]);
        if (results.length === 0) return res.status(404).json({ message: "Introuvable" });
        res.json(results[0]);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// 4. METTRE À JOUR UN ÉVÉNEMENT (PUT)
app.put('/api/events/:id', async (req, res) => {
    try {
        const cleanId = req.params.id.split(':')[0];
        const { title, location, date_event, description, price_standard, price_vip, stock_standard, stock_vip } = req.body;

        const sql = `UPDATE events SET 
            title=?, location=?, date_event=?, description=?, 
            price_standard=?, price_vip=?, stock_standard=?, stock_vip=? 
            WHERE id=?`;
        
        const values = [title, location, date_event, description, price_standard, price_vip, stock_standard, stock_vip, cleanId];
        await db.query(sql, values);
        
        res.json({ success: true, message: "Événement mis à jour !" });
    } catch (err) {
        console.error("Erreur PUT:", err);
        res.status(500).json({ error: err.message });
    }
});

// 5. SUPPRIMER UN ÉVÉNEMENT (DELETE)
app.delete('/api/events/:id', async (req, res) => {
    try {
        const cleanId = req.params.id.split(':')[0];
        await db.query("DELETE FROM events WHERE id = ?", [cleanId]);
        res.json({ success: true, message: "Événement supprimé !" });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// ==========================================
// AUTHENTIFICATION
// ==========================================
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [result] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (result.length === 0) return res.status(401).json({ success: false, message: "Email inconnu" });

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password).catch(() => false);
        const isPlainMatch = (password === user.password);

        if (isMatch || isPlainMatch) {
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
            return res.json({ success: true, token, username: user.username });
        }
        res.status(401).json({ success: false, message: "Mot de passe incorrect" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Lancement du serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📂 Dossier images : ${frontendImagePath}`);
});