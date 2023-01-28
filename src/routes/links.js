const express = require('express');
const router = express.Router();

const pool = require('../database');
// protec ruta
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
	res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
	// console.log(req.body);
	const { title,url,description } = req.body;
	const newLink ={
		title,
		url,
		description,
		// tomar is de ssesion de usuario
		user_id: req.user.id
	};
	// console.log(newLink);
	await pool.query('INSERT INTO links set ?', [newLink]);
	req.flash('success', 'Link guardado correctamente');
	// res.send('received');
	res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
	const links = await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id]);
	// console.log(links);
	res.render('links/list', {links});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
	// console.log(req.params.id);
	// res.send('DELETED');
	const { id } = req.params;
	await pool.query('DELETE FROM links WHERE ID = ?', [id]);
	req.flash('success', 'links Removido');
	res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	// console.log(id);
	// res.send('resivido');
	const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
	// console.log(links[0]);
	res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { title, description, url } = req.body;
	const newLink = {
		title,
		description,
		url
	};
	// console.log(newLink);
	// res.send('actualizado');
	 await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
	 req.flash('success', 'link Actualizado satifatoriamente!');
	 res.redirect('/links');
});

module.exports = router;