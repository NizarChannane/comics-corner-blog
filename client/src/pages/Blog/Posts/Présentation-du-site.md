# Bienvenue sur ComicsCorner

_1er Janvier 2024 par [Nizar Channane](/about)_

***Ce site web est un site portfolio, c'est une démo visant à démontrer mes compétences de développeur web et est à destination des recruteurs.***  
Il s'agit d'un blog proposant des articles sur des "*comics*" (bandes-déssinées américaines) et leur adaptations dans d'autres médias.

Le code source pour cet application est disponible sur [GitHub](/) et sera mis à jour au fur et à mesure de l'avancée du projet.

## **Description du projet**

Le projet consiste en une apprication **Node.js** (utiisant **Express**) connectée à une base de donnée **MySQL**. Ce serveur Node est organisé sous la forme d'une **API REST** consommée par la partie client qui utilise **React**.  
Il s'agit donc d'une "*stack*" reposant essentiellement sur le **Javascript**, ainsi que le **HTML** et **CSS** pour la partie client et le **SQL** pour la communication avec la base de données.

Le serveur est architecturé selon le schéma MVC où les requêtes reçues sont passées à une fonction *controller* qui pourra ensuite utiliser les fonctions exportées par les différents *models* afin d'apporter des modifications à la base de données.

Le client est une application React utilisant des composants fonctionnels. Une UI complètement **responsive** a été mise en place à l'aide de la librairie Material-UI et le routage est assuré par la librairie React-router-dom.  
De plus, les formulaires du site sont gérés par la librairie React-hook-form et leur validation par la librairie Yup.  
Concernant les articles de blog, leur contenu est stocké dans des fichiers **Markdown**.

Enfin, le code source est versionné avec Git.

Notez que le site ne présente pas encore l'ensemble des fonctionnalités attendues, veuillez vous référer à la section suivante pour en apprendre plus sur l'avancement du projet.

## **Avancement du projet**

