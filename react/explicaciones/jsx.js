// JSX es simplemente html dentro de javascript. Hay algunas (pocas) pequeñas diferencias en la syntaxis

const element = <h1>Hello, world!</h1>;

// Variables dentro de jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

// Funciones en jsx
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);
