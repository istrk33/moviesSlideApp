# Rapport problèmes, difficultés d'utilisation, question

<!-- 1. gestion des données : j'ai essayé de créer une variable de type entier mais lorsque je veux accéder à cette données j'ai ce message d'erreur.
```js
'use strict'

module.exports = (data, props, event) => {
  return {
    value: "world",
    totalDurationTime: 0
  }
}
```
![alt](./c1.png)
Le bout de code qui génère cette erreur est au niveau de value:
```js
{
        type: "flexible",
        child: {
          type: 'text',
          value: props.totalDurationTime
        }
}
``` -->
2. Gestion de fichiers externes (json)
pour l'inclusion d'un fichier en local, il n'est pas spécifié dans la doc comment (pas possible)

3. Pour les éléments `button`, la doc, on n'a pas le terme `action` dans le `onPressed` :
```js
"onPressed": {
            "$ref": "defs/listener.schema.json"
}
```

3. Problème d'affichage des images

4. Concernant la doc ça faciliterai la tâche d'avoir des bouts de code, avec le rendu en image pour voir ce que cela représente.
Par exemple je ne pensais pas que l'élément stack soit utilisé pour superposer des éléments.

5. Pas de doc pour comprendre comment placer les éléments d'une liste ou d'un tableau dans un flex par exemple en utilisant un élément pour y placer chaque item du tableau item.
```js
 return {
    //pour boucler des éléments
    type:"flex",
    direction:"vertical",
    children:[
      ...data.userInterests.forEach(element => {
        return {
          type: "button",
          text: element
        }
      })
    ]
  }
```

6. Pour l'intégration d'îcones, on doit mettre de grandes tailles parceque la taille par défaut(qui est indiqué dans la doc) est minuscule voir invisible.

7. Bouttons -> pas possible de changer le style ?

8. icones sur les boutons -> pas possible de placer uniquement une icone
```js
/*TODO
* actionnable pour les boutons : gérer style
* chercher une bonne api
* requete API
*/
```
