TodoList APP
============

  L'application TodoList est une application permettant de créer une "To-do List".
  ### Notions à connaître

  * To-do List : Liste de tâches à réaliser.
  * To-do : Tâche à réaliser.
  ### Éléments principaux

  L'application se compose des éléments suivants :
  * Input principal - Permettant l'entrée de To-do.
  * To-do List - S'affiche sous l'input principal, présentant les To-do créées.
  * Navbar - Présente sous la To-do List. Elle affiche le nombre de To-do à réaliser et un filtre d'affichage des To-do (Toutes les To-do, To-do à réaliser ou To-do réalisées).
  ### Fonctionnalités

  L'application propose diverses fonctionnalités :

  * Création d’une To-do
  
  > En utilisant l'input principal de l'application, renseignez un nom à votre To-do et validez en cliquant sur la touche "Entrée" de votre clavier ou hors du champs de l'input.

  * Modification d’un titre d’une Todo.
  
  > Un double clic sur le nom d'une To-do vous permettra de modifier son nom.

  * Modification de l’état d’une Todo (non réalisée/réalisée)
  
  > Pour indiquer qu'une To-do a été réalisée, ou inversement, cochez/décochez la checkbox circulaire située à gauche du nom de la To-do.

  * Modification multiple des états de Todos
  
  > Pour indiquer que toutes les To-do ont été réalisées, cliquez sur le logo de flèche situé à gauche de l'input principal.

  * Suppression d’une Todo
  
  > Au survol sur un nom de To-do, cliquer sur la croix rouge située à droite du nom de la To-do.

  * Suppression multiple de Todos à l’état ‘réalisée’
  
  > Lorsqu'au moins une To-do est à l'état 'réalisée', un lien affichant 'Clear completed' apparaît sur la droite de la Navbar. Au clic sur ce lien, toutes les To-do à l'état 'réalisées' seront supprimées.

  * Filtre d’affichage des Todos
  
  > Trois boutons de filtre sont présents au centre de la Navbar :
  * All : Permet d'afficher toutes les To-do.
  * Active : Permet d'afficher les To-do non réalisées.
  * Completed : Permet d'afficher les To-do réalisées.

Fonctionnement technique
------------------------

  L'application utilise les langages HTML/CSS/Javascript.

  ### Organisation des fichiers
    
  - App.js - Permet l’initialisation de l’application.

  - Store.js - Orchestre l'enregistrement des données de l’application dans le Local Storage de l’utilisateur.
    
  - Model.js - Permet l’administration/modification des données présentes dans le Store.
    
  - Controller.js - Fais le lien entre la View (notamment les actions de l’utilisateur) et le Model (Administration/Modification des données de l’application).
    
  - View.js - Gestionnaire des évènement/actions de l’utilisateur sur son interface navigateur.
    
  - Template.js - Permet une création/mise à jour ‘dynamique’ du contenu de l’interface utilisateur (ce que l’utilisateur voit sur son navigateur).
    
  - Helper.js - Regroupe les fonctions ‘helpers’, facilitant certains aspects de la logique du code (Gestion des évènements sur l’interface utilisateur, récupération d’éléments du DOM,…).

  ### Ajout de nouvelles fonctionnalités

  

  ### Testing

  L’application dispose de tests. Il est fortement recommandé de mettre en place des tests à chaque nouvelle fonctionnalité ajoutée à cette application. Ils permettent de s’assurer du bon fonctionnement de la fonctionnalité créée, mais aussi de vérifier que celle-ci ne ‘casse’ pas certains comportements déjà existants sur le l'application.
  Les tests (présents dans le dossier ./test) sont réalisés via le framework Jasmine.


Installation du projet
----------------------

  - npm install

  - (Mettre en place une commande pour ouvrir la page de tests Jasmine)

  - (Réussir à obtenir le taux de coverage de l’application)