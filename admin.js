
class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('./posts.php', {
      method: 'POST',
      body: data,
    }).then(results => {
      return results.json();
    }).then(data => {
      alert(data.msg);
      //console.log("DATA: "+data.json);
      ReactDOM.render(<ListView />, document.getElementById("app"));
    });
  }

  render() {
    return (
      <section id="login">
      <form onSubmit={this.handleSubmit}>
        <img src="default-user-image.png"/>
        <input id="usuario" name="user" type="text" placeholder='Usuario...'/>
        <input id="contrasena" name="pass" type="password" placeholder='Password...' />
        <button>Accesar</button>
      </form>
      </section>
    );
  }
}

class FormNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newContact};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeForm = this.closeForm.bind(this);
    editing:false;
  }

  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired
  }

  handleSubmit(event) {
    event.preventDefault();
    var nextElementosLista = this.state.contacts.concat([this.state]);
    this.setState({contacts: nextElementosLista});
  }

  closeForm(event) {
    event.preventDefault();
    document.getElementById('formulario').style.display='none';
  }

  render() {
    return (
        React.createElement('form', {
            className: 'ContactForm',
              id: 'ContactForm',
              name: 'ContactForm',
              ref:'ContactForm',
              action:"#",
              method:"POST",
              encType:"multipart/form-data"
            },
            React.createElement('input', {
              type: 'hidden',
              value: this.state.key,
              id: 'idElemento',
              name: 'idElemento',
              ref:'idElemento'
            }),
            React.createElement('input', {
              type: 'file',
              placeholder: 'Icono',
              value: this.state.icono,
              id: 'icono',
              name: 'icono',
              ref:'icono', 
              onChange:this.handleChange
            }),
            React.createElement('input', {
              type: 'text',
              placeholder: 'Clase',
              value: this.state.clase,
              id: 'clase',
              name: 'clase',
              ref:'clase', 
              defaultValue:this.props.link,
              onChange:this.handleChange
            }),
            React.createElement('input', {
              type: 'text',
              placeholder: 'Url',
              value: this.state.link,
              id: 'link',
              name: 'link',
              ref:'link', 
              defaultValue:this.props.link,
              onChange:this.handleChange
            }),
            React.createElement('select', {
              id: 'open',
              name: 'open',
              ref:'open', 
              onChange:this.handleChange
              },
              React.createElement('option', {
                value: '_self'
              }, 'Misma'),
              React.createElement('option', {
                value: '_Blank'
              }, 'Nueva')
            ),
            React.createElement('button', {type: 'submit', onClick:this.handleSubmit}, "GUARDAR"),
            React.createElement('button', {type: 'button', onClick:this.closeForm}, "CERRAR")
          )
        )
  }
}
class ListView extends React.Component {
  constructor(props) {
    super(props);


    this.state = {contacts};
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdition = this.handleEdition.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDelete(event){
    const target = event.target;
    const indice = target.parentElement.parentElement.parentElement.id;
    var LosElementosLista = this.state.contacts;
    LosElementosLista.splice(indice,1);
    this.setState({contacts: LosElementosLista});
  }

  handleEdition(event){
    const target = event.target;
    const indice = target.parentElement.parentElement.parentElement.id;
    var LosElementosLista = this.state.contacts;
    LosElementosLista.map(function(contact,index) {
        //console.log(contact.key+" => "+indice +" = " + contact.clase);
      if (contact.key==indice) {
        //console.log("ENC: " + contact.key+" => "+indice +" = " + contact.clase);
        //ReactDOM.render(<FormNew />, document.getElementById("formulario"));
        /*ReactDOM.render(
          React.createElement(FormNew, {
            newContact: contact
          }),
          document.getElementById('formulario')
        );*/
    console.log(contact);
      };
    });
    //this.setState({contacts: LosElementosLista});
  }

  openForm(event) {
    event.preventDefault();
    ReactDOM.render(<FormNew />, document.getElementById("formulario"));
    document.getElementById('formulario').style.display='block';
  }


  render() {
    self=this;
    return (
      React.createElement('section',{id:'mainsec'}, 
        React.createElement('div', {className: 'ContactView'},
          React.createElement('h1', {className: 'ContactView-title'}, "Listado"),
          React.createElement('div', {id: 'formView'},
            React.createElement('button', {type: 'button', onClick:this.openForm}, "NUEVO")
          ),
          React.createElement('div', {id: 'formulario'},''),
          React.createElement('ul', {className: 'ContactView-list'}, 
            this.state.contacts.map(function(contact,index) {
              return (
                React.createElement('li', {className: 'ContactItem',key:contact.key,id:contact.key,ref:contact.key},
                  React.createElement('img', {className: 'ContactItem-image',src:'http://localhost/misitio/public/img/iconos_metro/'+contact.icono}),
                  React.createElement('div', {className: 'ContactItem-description'},
                    React.createElement('h2', {className: 'ContactItem-name'}, contact.clase),
                    React.createElement('label', {className: 'ContactItem-clase'}, contact.open),
                    React.createElement('label', {className: 'ContactItem-clase'}, contact.link),
                    React.createElement('div', {className: 'ContactItem-clase'}, 
                      React.createElement('img', {className: 'ContactItem-edit', src:'http://localhost/misitio/public/img/notes.png',onClick:self.handleEdition}),
                      React.createElement('img', {className: 'ContactItem-delete', src:'http://localhost/misitio/public/img/trash.png',onClick:self.handleDelete })
                    )
                  )
                )
              )
            })
          )
      )//div
    )//section
    )//return
  } //render
} // class
var contacts = [];
var url = 'http://localhost/misitio/public/json/idesktop_full_js.json';
fetch(url)
.then(function(response) {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json();
})
.then(function(data) {
    data.desktopJson.map(function(datas,index) {
        //contacts.push({key:index, icono: "html5icon.jpg", clase: datas.title, open: "#", link: "#"});
      datas.content.map(function(datac,index) {
          contacts.push({key:index, icono: datac.ItemImage, clase: datac.ItemClass, open: datac.ItemTarget, link: datac.ItemLink});
      });
    });
});
var newContact = {icono: "", clase: "", open: "", link: ""}

ReactDOM.render(<Login />, document.getElementById("app"));