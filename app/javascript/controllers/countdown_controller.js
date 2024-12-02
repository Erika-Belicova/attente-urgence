// import { Controller } from '@hotwired/stimulus';

// const BEFORE = 'BEFORE';
// const DURING = 'DURING';
// const AFTER = 'AFTER';

// export default class extends Controller {
//   static values = {
//     interval: { default: 1000, type: Number },  // Normal interval (1 second)
//     fastForwardInterval: { default: 100, type: Number },  // Fast forward interval (0.1 second, faster)
//     locale: { default: 'en-GB', type: String },
//     from: String,
//     to: String,
//   };

//   static targets = [
//     'before',
//     'during',
//     'after',
//     'fromTime',
//     'toTime',
//     'toTimeRelative',
//     'remainingTime'
//   ];

//   connect() {
//     console.log("connected");

//     // Start the normal countdown interval
//     this._timer = setInterval(() => {
//       this.update();
//     }, this.intervalValue);

//     // Set the fast-forward flag to false initially
//     this.isFastForwarding = false;

//     // Add event listeners for keydown and keyup to trigger fast-forward functionality
//     window.addEventListener('keydown', this.handleKeydown.bind(this));
//     window.addEventListener('keyup', this.handleKeyup.bind(this));

//     this.setTimeValues();
//     this.update();
//   }

//   handleKeydown(event) {
//     // Start fast-forwarding when the "F" key is pressed
//     if (event.key.toLowerCase() === 'f' && !this.isFastForwarding) {
//       console.log("Fast forward started");
//       this.isFastForwarding = true;
//       this.startFastForward();
//     }
//   }

//   handleKeyup(event) {
//     // Stop fast-forwarding when the "F" key is released
//     if (event.key.toLowerCase() === 'f' && this.isFastForwarding) {
//       console.log("Fast forward stopped");
//       this.isFastForwarding = false;
//       this.stopFastForward();
//     }
//   }

//   startFastForward() {
//     // Fast-forward mode: Speed up the countdown
//     if (this.isFastForwarding) {
//       // Clear the normal timer and start a faster interval
//       clearInterval(this._timer);
//       this._timer = setInterval(() => {
//         this.update();
//       }, this.fastForwardIntervalValue);  // Fast-forward interval (0.1 second)
//     }
//   }

//   stopFastForward() {
//     // Stop fast-forward mode and return to normal countdown speed
//     clearInterval(this._timer);
//     this._timer = setInterval(() => {
//       this.update();
//     }, this.intervalValue);  // Normal interval (1 second)
//   }

//   getTimeData() {
//     const from = this.hasFromValue && new Date(this.fromValue);
//     const to = this.hasToValue && new Date(this.toValue);

//     if (!from || !to) return;
//     if (from > to) {
//       throw new Error('From time must be after to time.');
//     }

//     const now = new Date();

//     const status = (() => {
//       if (now < from) return BEFORE;
//       if (now >= from && now <= to) return DURING;
//       return AFTER;
//     })();

//     return { from, to, now, status };
//   }

//   formatRemainingTime(seconds) {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     // Ensure two digits for minutes and seconds
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   }

//   setTimeValues() {
//     const { from, to, now } = this.getTimeData();
//     const locale = this.localeValue;

//     const formatter = new Intl.DateTimeFormat(locale, {
//       dateStyle: 'short',
//       timeStyle: 'short',
//     });

//     this.fromTimeTargets.forEach((element) => {
//       element.setAttribute('datetime', from);
//       element.innerText = formatter.format(from);
//     });

//     this.toTimeTargets.forEach((element) => {
//       element.setAttribute('datetime', to);
//       element.innerText = formatter.format(to);
//     });

//     const relativeFormatter = new Intl.RelativeTimeFormat(locale, {
//       numeric: 'auto',
//     });

//     this.toTimeRelativeTargets.forEach((element) => {
//       element.setAttribute('datetime', to);
//       element.innerText = relativeFormatter.format(
//         Math.round((to - now) / 1000),
//         'seconds'
//       );
//     });
//   }

//   update() {
//     const { status, from, to, now } = this.getTimeData();

//     // Show and hide relevant sections based on status
//     [
//       [BEFORE, this.beforeTarget],
//       [DURING, this.duringTarget],
//       [AFTER, this.afterTarget],
//     ].forEach(([key, element]) => {
//       if (key === status) {
//         element.style.display = "block"; // Explicitly set to block
//       } else {
//         element.style.display = "none"; // Explicitly set to none
//       }
//     });

//     // Update the remaining time if the status is DURING
//     if (status === DURING) {
//       const remainingTimeInSeconds = Math.floor((to - now) / 1000); // Calculate remaining time in seconds
//       this.remainingTimeTarget.innerText = this.formatRemainingTime(remainingTimeInSeconds);
//     }

//     // Stop the timer after the deal ends
//     if (status === AFTER) {
//       this.stopTimer();
//     }

//     this.setTimeValues();
//   }

//   stopTimer() {
//     if (this._timer) {
//       clearInterval(this._timer);
//     }
//   }

//   disconnect() {
//     this.stopTimer();
//     window.removeEventListener('keydown', this.handleKeydown);
//     window.removeEventListener('keyup', this.handleKeyup);
//   }
// }


// to hore ide ######################################################################################

import { Controller } from '@hotwired/stimulus';

const BEFORE = 'BEFORE';
const DURING = 'DURING';
const AFTER = 'AFTER';

export default class extends Controller {
  static values = {
    interval: { default: 1000, type: Number },  // Normal interval (1 second)
    fastForwardInterval: { default: 16.67, type: Number },  // Fast-forward interval (60 updates per second)
    locale: { default: 'en-GB', type: String },
    from: String,
    to: String,
  };

  static targets = [
    'before',
    'during',
    'after',
    'fromTime',
    'toTime',
    'toTimeRelative',
    'remainingTime'
  ];

  connect() {
    console.log("connected");

    // Start the normal countdown interval
    this._timer = setInterval(() => {
      this.update();
    }, this.intervalValue);

    // Set the fast-forward flag to false initially
    this.isFastForwarding = false;

    // Add event listeners for keydown and keyup to trigger fast-forward functionality
    window.addEventListener('keydown', this.handleKeydown.bind(this));
    window.addEventListener('keyup', this.handleKeyup.bind(this));

    this.setTimeValues();
    this.update();
  }

  handleKeydown(event) {
    // Toggle between fast-forward and normal speed when the "F" key is pressed
    if (event.key.toLowerCase() === 'f') {
      if (!this.isFastForwarding) {
        console.log("Fast forward started");
        this.isFastForwarding = true;
        this.startFastForward();
      } else {
        console.log("Fast forward stopped");
        this.isFastForwarding = false;
        this.stopFastForward();
      }
    }
  }

  handleKeyup(event) {
    // Handle keyup if needed, or leave it empty as the toggle happens on keydown
  }

  startFastForward() {
    // Fast-forward mode: Speed up the countdown to 60 updates per second (16.67ms)
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      this.update();
    }, this.fastForwardIntervalValue);  // Fast-forward interval (16.67ms)
  }

  stopFastForward() {
    // Stop fast-forward mode and return to normal countdown speed (1 second)
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      this.update();
    }, this.intervalValue);  // Normal interval (1 second)
  }

  getTimeData() {
    const from = this.hasFromValue && new Date(this.fromValue);
    const to = this.hasToValue && new Date(this.toValue);

    if (!from || !to) return;
    if (from > to) {
      throw new Error('From time must be after to time.');
    }

    const now = new Date();

    const status = (() => {
      if (now < from) return BEFORE;
      if (now >= from && now <= to) return DURING;
      return AFTER;
    })();

    return { from, to, now, status };
  }

  formatRemainingTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Ensure two digits for minutes and seconds
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  setTimeValues() {
    const { from, to, now } = this.getTimeData();
    const locale = this.localeValue;

    const formatter = new Intl.DateTimeFormat(locale, {
      dateStyle: 'short',
      timeStyle: 'short',
    });

    this.fromTimeTargets.forEach((element) => {
      element.setAttribute('datetime', from);
      element.innerText = formatter.format(from);
    });

    this.toTimeTargets.forEach((element) => {
      element.setAttribute('datetime', to);
      element.innerText = formatter.format(to);
    });

    const relativeFormatter = new Intl.RelativeTimeFormat(locale, {
      numeric: 'auto',
    });

    this.toTimeRelativeTargets.forEach((element) => {
      element.setAttribute('datetime', to);
      element.innerText = relativeFormatter.format(
        Math.round((to - now) / 1000),
        'seconds'
      );
    });
  }

  update() {
    const { status, from, to, now } = this.getTimeData();

    // Show and hide relevant sections based on status
    [
      [BEFORE, this.beforeTarget],
      [DURING, this.duringTarget],
      [AFTER, this.afterTarget],
    ].forEach(([key, element]) => {
      if (key === status) {
        element.style.display = "block"; // Explicitly set to block
      } else {
        element.style.display = "none"; // Explicitly set to none
      }
    });

    // Update the remaining time if the status is DURING
    if (status === DURING) {
      const remainingTimeInSeconds = Math.floor((to - now) / 1000); // Calculate remaining time in seconds
      this.remainingTimeTarget.innerText = this.formatRemainingTime(remainingTimeInSeconds);
    }

    // Stop the timer after the deal ends
    if (status === AFTER) {
      this.stopTimer();
    }

    this.setTimeValues();
  }

  stopTimer() {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  disconnect() {
    this.stopTimer();
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keyup', this.handleKeyup);
  }
}
