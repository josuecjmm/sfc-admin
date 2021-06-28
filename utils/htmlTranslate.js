const html = require('../constants/html');
const translate = require('./translate');

exports.translateHtml = async language => {
  // Welcome Screen
  html.h1 = await translate.translate(html.h1,language);

  // Navigation
  let {security,admin,query} = html.navigation;

  const translatedSecurity = await Promise.all(security.map(async label => {
      return await translate.translate(label, language)
  }));
  html.navigation.security = translatedSecurity;

  const translatedAdmin = await Promise.all(admin.map(async label => {
    return await translate.translate(label, language)
  }));
  html.navigation.admin = translatedAdmin;

  const translatedQuery = await Promise.all(query.map(async label => {
    return await translate.translate(label, language)
  }));
  html.navigation.query = translatedAdmin;

  // Set language to keep translating
  translate.from(language)
};
