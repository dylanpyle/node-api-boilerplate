'use strict';

// Handle non-500 controller errors gracefully. Instead of outputting to
// stdout/stderr, just return them in a JSON response body.

function* errors(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;

    if (this.status === 500) {
      this.app.emit('error', err, this);
    }

    if (this.status >= 500) {
      this.body = { error: 'Something went wrong!' };
    } else {
      this.body = { message: err.message };
    }
  }
}

module.exports = errors;
