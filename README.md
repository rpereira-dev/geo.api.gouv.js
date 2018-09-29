# geo.gouv.js
Binding javascript de https://geo.api.gouv.fr/

Demo : https://jsfiddle.net/jq95nsmz/9/

# Utilisation
Inclures la bibliothèque dans le header de votre page (voir dossier 'dist/')
```html
<script src="dist/geo.api.gouv.min.js"></script>
```

Exemple d'utilisation : récupérer toute les communes qui contiennent 'Noisy'
```js
Gouv.geo.communes.get({nom: 'Noisy'}).then(r => {
   console.log(`Status code: ${r.status}`);
   console.log(r.res);
});
```

Exemple d'utilisation : récuperer tous les départements
```javascript
Gouv.geo.departements.get().then(r =>
   console.log(`Status code: ${r.status}`);
   console.log(r.res);
);
```

Exemple d'utilisation : récuperer une région par son code ('11' est le code de l'Ile de France)
```javascript
Gouv.geo.region.code.get(11).then(r =>
   console.log(`Status code: ${r.status}`);
   console.log(r.res);
);
```

# Tester l'API
```
npm install
npm run test
```

# Developpement
- Modifier le code ('index.js')
- Exporter les modifications
```
npm run build
```
- Exporter la documentation
```
npm run docs
```

