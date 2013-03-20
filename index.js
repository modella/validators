module.exports = process.env.TEST_COV ? require('./lib-cov/validators') : require('./lib/validators');
