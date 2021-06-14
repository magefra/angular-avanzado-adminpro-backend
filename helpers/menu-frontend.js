  const getMenuFrontEnd = (role = "USER_ROLE") =>{

  const menu =  [

        {
          titulo: 'Dashboard!!',
          icono :'mdi mdi-gauge',
          subMenu: [
            {
              titulo: 'Main',
              url: '/'
            },
            {
              titulo: 'Progressbard',
              url: 'progress'
            },
            {
              titulo: 'Graficas',
              url: 'grafica1'
            },
            {
              titulo: 'Promesas',
              url: 'promesas'
            },
            {
              titulo: 'Rxjs',
              url: 'rxjs'
            },
            {
              titulo: 'Perfil',
              url: 'perfil'
            },
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono :'mdi mdi-folder-lock-open',
          subMenu: [
           // {
             // titulo: 'Usuarios',
              //url: 'usuarios'
            //},
            {
              titulo: 'Hospitales',
              url: 'hospitales'
            },
            {
              titulo: 'Médicos',
              url: 'medicos'
            },
          ]
        }
      ];
    if(role=== 'ADMIN_ROLE'){
        menu[1].subMenu.unshift( { titulo: 'Usuarios',url: 'usuarios'})
    }

    return menu;
}


module.exports = {
    getMenuFrontEnd
}