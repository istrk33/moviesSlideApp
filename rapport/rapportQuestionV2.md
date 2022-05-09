# Rapport V2
1. Gestion des fichiers externes (en local)
2. Avoir des exemples d'utilisation de code dans la doc, avec des screens ? 
3. Valeur par défaut des icones minuscule, avoir une taille par défaut plus élevée
4. Filtre d'opacité pour une image, récupération de la taille
5. minHeight sur la constraint du conteneur qui efface le contenu
6. On ne peut pas rendre invisible le background du actionnable lorsqu'on a une icone de forme ronde et qu'on fait un border radius.
 ![alt](c4.png)
 7. On ne sait pas quand on rentre et quitte un hover sur un actionnable
 8. Centrer le texte lorsque que le texte est trop long :
![-1](c6.png)
![-1](c7.png)
9. dropdown permettre la personnalisation comme les actionables
10. latence 
11. lors du rechargement de la page apres un hover, l'affichage aléatoire de de quelques éléments d'un tableau s'actualise et on peut avoir cet évènement en boucle
12. le hover sur un actionable>menu>dropdown (actionable qui est dans un menu qui est dans une dropdown) ne premet pas de mettre à jour le style de l'actionnable
13. gestion d'affichage de tableau difficile
14. background d'une vue de scroll non disponible
15.  quand ca fait un moment qu'il n'y a aucune interaction avec le devtool des valeurs (tableaux du init data) passent en undefined, et cela se répercute dès qu'un hover est fait sur un bouton par exemple une erreur est générée.
16. slider onChanged agit comme un onChangedEnd (prends la valeur que quand on relache le slider)
17. la contrainte maxWidth efface textfield

## Nouvelle méthode de la gestion des données

1. le fichier counterService.js est propre à chaque appli ?
    > * createDatastore -> créer une collection qui se nome `Counter`.
    > * new -> créer un compteur 
    > * delete -> créer un compteur 
    > * put -> mettre à jour un compteur
    > * get -> récupérer un compteur
```js
'use strict'

const { default: axios } = require("axios");

module.exports = {
    get(api, counterId) {
        return axios.get(`${api.url}/app/datastores/Counter/data/${counterId}`, { headers: { Authorization: `Bearer ${api.token}` } }
        );
    },
    put(api, counter) {
        return axios.put(`${api.url}/app/datastores/Counter/data/${counter._id}`, counter, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    new(api) {
        return axios.post(`${api.url}/app/datastores/Counter/data`, { "value": 0 }, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    delete(api, counterId) {
        return axios.delete(`${api.url}/app/datastores/Counter/data/${counterId}`, { headers: { Authorization: `Bearer ${api.token}` } });

    },
    createDatastore(api) {
        return axios.post(`${api.url}/app/datastores`, { "name": "Counter" }, { headers: { Authorization: `Bearer ${api.token}` } });
    }
}

```

2. Différence entre le onEnvStart et le onSessionStart ?

3. 

<!-- 
* passer le tableau data en props pas beoin de refaire un query ???
 -->