const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

// L'app mobile réutilise la logique pure du web (takes, daily, salt, mock) :
// une seule source de vérité — la routine « take du jour » sert aussi le mobile.
const config = getDefaultConfig(__dirname)
config.watchFolders = [path.resolve(__dirname, '..', 'src')]
module.exports = config
