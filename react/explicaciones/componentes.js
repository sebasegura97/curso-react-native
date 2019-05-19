// Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
// Existen dos tipos de componentes:

    // Function components: Componentes de funcion o componentes "tontos", solo muestran alguna interfaz grafica.
    function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
    }
    const Goodbye = (props) => { <h2> Chau! {props.name} </h2> }

    // Class components: Componentes de clase / componentes 'inteligentes' / containers, se encargan de la logica de la aplicacion, tienen estado y ciclo de vida

    class Welcome extends React.Component {
        // El unico metodo necesario es render(){}  
        componentWillMount(){}
        componentDidMount(){}
        componentWillUnmount(){}
        render() {
            return <h1>Hello, {this.props.name}</h1>;
        }
    }

    // Composicion de componentes

    class Welcome extends React.Component {
        render() {
            return <Goodbye />
        }
    }