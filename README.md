
## Projet PHP Num 2 (Yael et Annaick)

## Installer le projet en local

### 1 - Pre-installation
Il faudra vérifier que ces programmes sont bien installés:
- Git
- NodeJS (npm sera installé automatiquement avec)
- Composer PHP
- WAMP

### 2 - Télécharger le projet
- Il faudra créer un dossier et ouvrir le terminal, ensuite naviguer dans le dossier crée à partir du terminal:

```cd chemin/vers/le/dossier```

- Initier github

```git init```

- Renommer la branche principale en 'main'

```git branch -M main```

- Se connecter au repo distant github, raha vo sambany manao an'io de misy processus de connexion zay aloha mila atao

```git remote add origin https://github.com/Annaick/projetLaravel``` 

- Télécharger le repo en local

```git pull origin main```

### 3 - Installer les dépendaces

- Installer les packages php:

```composer install```

- Installer les packages javascript:

```npm install```

- renommer le fichier '.env.example' en '.env' 

- Initer le database
```php artisan migrate```

### 4 - Démarrer le projet
- Lancer le serveur WAMP
- Lancer la commande ```npm run dev```
- Lancer la commande ```php artisan serve```


Voilà, maintenant ouvrir le navigateur et aller à l'url: http://127.0.0.1:8000/





