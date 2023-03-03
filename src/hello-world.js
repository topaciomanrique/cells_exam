import { LitElement, html, css } from "lit";
import "@material/mwc-button";
import "@material/mwc-textfield";

class HelloWorld extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      gift: { type: String },
      list_persons: { type: Array },
      list_pack: { type: Array }
      //list_gifts: { type: Array }
    };
  }

  constructor() {
    super();
    this.name = "";
    this.gift = "";
    this.list_persons = [];
    this.list_pack = [];
    //this.list_gifts = [];
  }
  static get styles() {
    return css`
      body {
        margin: 30;
      }
    `;
  }

  addPerson(e) {
    const name_query = this.shadowRoot.querySelector("#name");
    const gifts_query = this.shadowRoot.querySelector("#gift");
    const find_persons = this.list_persons.filter(
      (person) => person.name.toLowerCase() === name_query.value.toLowerCase()
    );
    if (find_persons.length > 0) {
      this.list_persons = this.list_persons.map((item) => {
        if (item.name.toLowerCase() === find_persons[0].name) {
          return {
            name: find_persons[0].name,
            gifts: [...find_persons[0].gifts, gifts_query.value]
          };
        } else {
          return item;
        }
      });
    } else {
      this.list_persons = [
        ...this.list_persons,
        { name: name_query.value.toLowerCase(), gifts: [gifts_query.value] }
      ];
    }
    this.name = "";
    this.gift = "";
    console.log(this.list_persons);
  }

  sorteo(e) {
    const { length } = this.list_persons;
    this.list_pack = this.list_persons.map((item, i) => {
      if (i === 0) {
        return {
          name: item.name,
          gifts: [this.list_persons[length - 1].gifts[0]]
        };
      } else {
        return {
          name: item.name,
          gifts: [this.list_persons[i - 1].gifts[0]]
        };
      }
    });
    console.log(this.list_pack);
  }

  render() {
    return html`
      <section id="title-section">
        <h1>Intercambio de regalos</h1>
      </section>
      <section id="add-section">
        <h3>Agrega el nombre y el/los regalos</h3>
        <mwc-textfield
          id="name"
          label="Nombre"
          helper="Escribe sólo el nombre"
          @change="${(e) => (this.name = e.target.value)}"
          .value=${this.name}
        ></mwc-textfield>
        <mwc-textfield
          id="gift"
          label="Regalo"
          helper="Escribe el regalo"
          @change="${(e) => (this.gift = e.target.value)}"
          .value=${this.gift}
        ></mwc-textfield>
        <mwc-button @click=${this.addPerson} raised>Agregar</mwc-button>
      </section>
      <section id="lists-section">
        <h3>Participantes</h3>
        <ul>
          ${this.list_persons.length > 0
            ? this.list_persons.map((item) => {
                return html`
                  <li>
                    ${item.name} quiere de regalo:
                    <ul>
                      ${item.gifts.map((gifts) => {
                        return html` <li>${gifts}</li> `;
                      })}
                    </ul>
                  </li>
                `;
              })
            : html` <p>Aun no hay participantes</p> `}
        </ul>
        ${this.list_persons.length >= 3
          ? html` <mwc-button @click=${this.sorteo} raised>Sorteo</mwc-button>`
          : html``}
      </section>
      <section id="sorteo-section">
        <h3>Orden del intercambio</h3>
        <ul>
          ${this.list_pack.map((item) => {
            return html`
              <li>
                ${item.name} va a regalar:
                <ul>
                  ${item.gifts.map((gifts) => {
                    return html` <li>${gifts}</li> `;
                  })}
                </ul>
              </li>
            `;
          })}
        </ul>
      </section>
    `;
  }
}

customElements.define("hello-world", HelloWorld);
