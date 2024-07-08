/* Recibe una funcion y la ejecuta, en caso de tener algun error como respuesta
   lo atrapa con catch y pasa a next para desplegar el error en pantalla */
module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
