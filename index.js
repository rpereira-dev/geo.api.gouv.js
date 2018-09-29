/**
 * @file Contient l'API javascript navigateur, wrapper de 'geo.api.gouv.fr'
 * @author Romain PEREIRA
 */


/** définit l'api si elle n'existe pas */
if (typeof Gouv == 'undefined') {
    Gouv = {};
}

/** définit la fonction 'request' */
if (typeof Gouv.request == 'undefined') {
    Gouv.request = {};
}

/** définit la fonction 'request.get' */
if (typeof Gouv.request.get == 'undefined') {
    /**
     * Executes une requete GET à l'url donné, avec les paramètres données
     * @param {string} url 
     * @param {Object} parameters 
     */
    Gouv.request.get = (url, parameters) => {
        if (Object.keys(parameters).length > 0) {
            let parametersArray = [];
            for (let parameterName in parameters) {
                parametersArray.push(encodeURIComponent(parameterName) + '=' + encodeURIComponent(parameters[parameterName]));
            }
            url += '?' + parametersArray.join('&');
        }
        return fetch(url, { method: 'GET' }).then(async r => {
            r.res = await r.text();
            return Promise.resolve(r);
        });
    }
}


/**
 * Le module 'geo' de l'API
 * @namespace geo
 */
Gouv.geo = {
    /**
     * Le module 'communes'
     * @namespace geo.communes
     */
    communes: {
        /**
         * Recupere des communes
         * @param {Object} parameters les paramètres de la requete ('codePostal', 'lat', ..., 'fields', 'format', 'geometry')
         * @memberof geo.communes
         */
        get(parameters = { nom: 'Paris' }) {
            return Gouv.request.get('https://geo.api.gouv.fr/communes', parameters);
        },

        /**
         * Le module 'code' 
         * @namespace geo.communes.code
         */
        code: {
            /**
             * Recupere une commune par son code INSEE
             * @param {number} code le code INSEE de la commune
             * @param {Object} parameters les paramètres de la requete ('fields', 'format', 'geometry')
             * @memberof geo.communes.code
             */
            get(code = '77339', parameters = {}) {
                return Gouv.request.get(`https://geo.api.gouv.fr/communes/${code}`, parameters);
            }
        },
    },

    /**
     * Le module 'departement'
     * @namespace geo.departements
     */
    departements: {
        /**
         * Le module 'departements.code'
         * @namespace geo.departements.code
         */
        code: {
            /**
             * Récupérer les informations concernant un département
             * @param {number} code le code du département
             * @param {Object} parameters les paramètres de la requete ('fields')
             * @memberof geo.departements.code
             */
            get(code = '77', parameters = {}) {
                return Gouv.request.get(`https://geo.api.gouv.fr/departements/${code}`, parameters);
            },

            /**
             * Le module 'departement'
             * @namespace geo.departements.code.communes
             */
            communes: {
                /**
                 * Renvoi les communes d'un département
                 * @param {number} code le code du département
                 * @param {Object} parameters les paramètres de la requete ('fields', 'format', 'geometry')
                 * @memberof geo.departements.code.communes
                 */
                get(code = '77', parameters = {}) {
                    return Gouv.request.get(`https://geo.api.gouv.fr/departements/${code}/communes`, parameters);
                }
            },
        },
        /**
         * Recherche des départements
         * @param {Object} parameters les paramètres de la requete ('code', 'codeRegion', fields', 'format', 'geometry')
         * @memberof geo.departements
         */
        get(parameters = {}) {
            return Gouv.request.get(`https://geo.api.gouv.fr/departements`, parameters);
        },
    },

    /**
     * Le module 'regions'
     * @namespace geo.regions
     */
    regions: {
        /**
         * Le module 'regions.code'
         * @namespace geo.regions.code
         */
        code: {
            /**
             * Renvoi les départements d'une région
             * @param {number} code le code de la region
             * @param {Object} parameters les paramètres de la requete ('code', 'codeRegion', fields', 'format', 'geometry')
             * @memberof geo.regions.code
             */
            get(code = '11', parameters = {}) {
                return Gouv.request.get(`https://geo.api.gouv.fr/regions/${code}`, parameters);
            },

            /**
             * Le module 'regions.code.departements'
             * @namespace geo.regions.code.departements
             */
            departements: {
                /**
                 * Renvoi les départements d'une région
                 * @param {number} code le code de la region
                 * @param {Object} parameters les paramètres de la requete ('code', 'codeRegion', fields', 'format', 'geometry')
                 * @memberof geo.regions.code.departements
                 */
                get(code = '11', parameters = {}) {
                    return Gouv.request.get(`https://geo.api.gouv.fr/regions/${code}/departements`, parameters);
                },
            }
        }
    }
};