const environment = process.env.ENVIRONMENT;

export default require(`./config/${environment}`);

