# Hyptertube

## Obtenir la version v11.0.0 de Node
Mise a jour de Brew <br>
`rm -rf $HOME/.brew && git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew && export PATH=$HOME/.brew/bin:$PATH && brew update && echo "export PATH=$HOME/.brew/bin:$PATH" >> ~/.zshrc`

Installation de Node (Avec Node Version Manager) <br>
```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | zsh```

*attention, il faut relancer le shell pour que NVM se mette dans le $PATH*

```nvm install```

## Installation des dependances
// Attention bug sur l'install de mongo je cherche comment faire
Faire d'abord un `npm i` dans le repertoire client et api <br>
Si ce n'est pas dèjà fait installer mongodb via `brew install mongodb` <br>
Pour que la db start automatiquement au login `brew services start mongodb` <br>

## Comment visualiser la DB Mongo ?
En utilisant Robomongo (Disponible dans le MSC)
