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
//#################################################################################################################

// import { Controller } from '@hotwired/stimulus';

// const DURING = 'DURING';

// export default class extends Controller {
//   static values = {
//     interval: { default: 1000, type: Number },  // Normal interval (1 second)
//     fastForwardFactor: { default: 60, type: Number },  // Factor to speed up the countdown
//     locale: { default: 'en-GB', type: String },
//     from: String,
//     to: String,
//     savedTime: { default: 0, type: Number }  // Store the saved time in the future
//   };

//   static targets = [
//     'during',
//     'remainingTime'
//   ];

//   connect() {
//     console.log("connected");

//     // Load the saved time from localStorage if it exists
//     this.startTime = this.savedTimeValue || new Date().getTime(); // Use the stored time or initialize to current time
//     this.endTime = this.hasToValue ? new Date(this.toValue).getTime() : this.startTime + 3600000; // 1 hour default if "to" time is not set

//     // Start the normal countdown
//     this._timer = setInterval(() => {
//       this.update();
//     }, this.intervalValue);

//     this.isFastForwarding = false;  // No fast-forwarding initially

//     // Add event listeners for keydown and keyup to trigger fast-forward functionality
//     window.addEventListener('keydown', this.handleKeydown.bind(this));
//     window.addEventListener('keyup', this.handleKeyup.bind(this));

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
//     // Fast forward: Every second in real time equals 60 seconds in countdown
//     this._timer = setInterval(() => {
//       this.update();
//     }, this.intervalValue / this.fastForwardFactorValue);  // Speed up countdown by factor (60x)
//   }

//   stopFastForward() {
//     // Stop fast-forwarding and save the current time to localStorage
//     this.savedTime = new Date().getTime();
//     localStorage.setItem('savedTime', this.savedTime);  // Persist the time in localStorage
//     this._timer = setInterval(() => {
//       this.update();
//     }, this.intervalValue);  // Return to normal interval speed (1 second)
//   }

//   getTimeData() {
//     const now = new Date().getTime();
//     const status = now >= this.startTime && now <= this.endTime ? DURING : null;
//     return { now, status };
//   }

//   formatRemainingTime(seconds) {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     // Ensure two digits for minutes and seconds
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   }

//   update() {
//     const { status, now } = this.getTimeData();

//     // Only show the countdown if the status is DURING
//     if (status === DURING) {
//       let remainingTimeInSeconds = Math.floor((this.endTime - now) / 1000); // Calculate remaining time in seconds

//       // If fast-forwarding is active, speed up the countdown by 60x
//       if (this.isFastForwarding) {
//         remainingTimeInSeconds -= 60; // Decrease the time by 60 seconds for each real second
//       }

//       this.remainingTimeTarget.innerText = this.formatRemainingTime(remainingTimeInSeconds);
//     }

//     // Stop the timer once the countdown reaches 0
//     if (status !== DURING) {
//       this.stopTimer();
//     }
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

// ######################################################################################################################
// dole skip sekundy na key press neefektivne ale ide to

// import { Controller } from '@hotwired/stimulus';

// export default class extends Controller {
//   static values = {
//     interval: { default: 1000, type: Number }, // Normal interval (1 second)
//     fastForwardFactor: { default: 60, type: Number }, // Fast-forward factor (1 second = 1 minute)
//     from: String,
//     to: String,
//   };

//   static targets = ['remainingTime'];

//   connect() {
//     console.log('connected');

//     // Define the initial end time
//     this.startTime = new Date();
//     this.endTime = this.hasToValue
//       ? new Date(this.toValue)
//       : new Date(this.startTime.getTime() + 3600000); // Default to 1 hour from now

//     // Timer state
//     this.isFastForwarding = false;

//     // Start normal countdown
//     this.startTimer(this.intervalValue);

//     // Listen for keydown and keyup events
//     window.addEventListener('keydown', this.handleKeydown.bind(this));
//     window.addEventListener('keyup', this.handleKeyup.bind(this));
//   }

//   startTimer(interval) {
//     this.clearTimer(); // Clear existing timer, if any
//     this._timer = setInterval(() => this.update(), interval);
//   }

//   clearTimer() {
//     if (this._timer) {
//       clearInterval(this._timer);
//     }
//   }

//   handleKeydown(event) {
//     if (event.key.toLowerCase() === 'f' && !this.isFastForwarding) {
//       console.log('Fast forward started');
//       this.isFastForwarding = true;

//       // Simulate faster passage of time
//       this.startTimer(this.intervalValue / this.fastForwardFactorValue);
//     }
//   }

//   handleKeyup(event) {
//     if (event.key.toLowerCase() === 'f' && this.isFastForwarding) {
//       console.log('Fast forward stopped');
//       this.isFastForwarding = false;

//       // Save the adjusted end time to maintain consistency
//       this.endTime = new Date(
//         this.endTime.getTime() - (this.intervalValue / this.fastForwardFactorValue) * 60
//       );

//       // Return to normal speed
//       this.startTimer(this.intervalValue);
//     }
//   }

//   update() {
//     const now = new Date();
//     let remainingTimeInSeconds = Math.floor((this.endTime - now) / 1000);

//     if (remainingTimeInSeconds <= 0) {
//       this.clearTimer();
//       remainingTimeInSeconds = 0;
//     }

//     this.remainingTimeTarget.innerText = this.formatRemainingTime(remainingTimeInSeconds);
//   }

//   formatRemainingTime(seconds) {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     return `${hours.toString().padStart(2, '0')}:${minutes
//       .toString()
//       .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   }

//   disconnect() {
//     this.clearTimer();
//     window.removeEventListener('keydown', this.handleKeydown);
//     window.removeEventListener('keyup', this.handleKeyup);
//   }
// }

// ####################################################################################################################
// FUNGUJE meni iba minutu po minute


// import { Controller } from '@hotwired/stimulus';

// export default class extends Controller {
//   static values = {
//     interval: { default: 1000, type: Number }, // Normal interval (1 second)
//     from: String,
//     to: String,
//   };

//   static targets = ['remainingTime'];

//   connect() {
//     console.log('connected');

//     // Define the initial end time
//     this.startTime = new Date();
//     this.endTime = this.hasToValue
//       ? new Date(this.toValue)
//       : new Date(this.startTime.getTime() + 3600000); // Default to 1 hour from now

//     // Timer state
//     this.isFastForwarding = false;

//     // Start normal countdown
//     this.startTimer(this.intervalValue);

//     // Listen for keydown and keyup events
//     window.addEventListener('keydown', this.handleKeydown.bind(this));
//     window.addEventListener('keyup', this.handleKeyup.bind(this));
//   }

//   startTimer(interval) {
//     this.clearTimer(); // Clear existing timer, if any
//     this._timer = setInterval(() => this.update(), interval);
//   }

//   clearTimer() {
//     if (this._timer) {
//       clearInterval(this._timer);
//     }
//   }

//   handleKeydown(event) {
//     if (event.key.toLowerCase() === 'f' && !this.isFastForwarding) {
//       console.log('Fast forward started');
//       this.isFastForwarding = true;

//       // Simulate faster passage of minutes
//       this.startFastForward();
//     }
//   }

//   handleKeyup(event) {
//     if (event.key.toLowerCase() === 'f' && this.isFastForwarding) {
//       console.log('Fast forward stopped');
//       this.isFastForwarding = false;

//       // Save the adjusted end time and return to normal speed
//       this.adjustEndTime();
//       this.startTimer(this.intervalValue);
//     }
//   }

//   startFastForward() {
//     // Clear current timer and set a new one for minute skipping
//     this.clearTimer();
//     this._timer = setInterval(() => {
//       this.skipMinute();
//     }, this.intervalValue); // Continue to skip minutes at the interval rate
//   }

//   skipMinute() {
//     // Reduce the end time by 1 minute
//     this.endTime = new Date(this.endTime.getTime() - 60000); // Subtract 1 minute (60000 ms)
//     this.update();
//   }

//   adjustEndTime() {
//     // Ensure the current remaining time is accurate after fast-forwarding
//     const now = new Date();
//     const remainingTimeInSeconds = Math.floor((this.endTime - now) / 1000);

//     if (remainingTimeInSeconds <= 0) {
//       this.endTime = now; // Set end time to now if time is up
//     }
//   }

//   update() {
//     const now = new Date();
//     let remainingTimeInSeconds = Math.floor((this.endTime - now) / 1000);

//     if (remainingTimeInSeconds <= 0) {
//       this.clearTimer();
//       remainingTimeInSeconds = 0;
//     }

//     this.remainingTimeTarget.innerText = this.formatRemainingTime(remainingTimeInSeconds);
//   }

//   formatRemainingTime(seconds) {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     return `${hours.toString().padStart(2, '0')}:${minutes
//       .toString()
//       .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   }

//   disconnect() {
//     this.clearTimer();
//     window.removeEventListener('keydown', this.handleKeydown);
//     window.removeEventListener('keyup', this.handleKeyup);
//   }
// }


// #################################################################################################################
// FUNGUJE VYBORNE, MENI MINUTY TOTO

// import { Controller } from '@hotwired/stimulus';

// const DURING = 'DURING';

// export default class extends Controller {
//   static values = {
//     interval: { default: 1000, type: Number },  // Normal interval (1 second)
//     locale: { default: 'en-GB', type: String },
//     from: String,
//     to: String,
//   };

//   static targets = ['during', 'fromTime', 'toTime', 'remainingTime'];

//   connect() {
//     console.log("connected");

//     // Start the normal countdown interval
//     this.timer = setInterval(() => {
//       this.update();
//     }, this.intervalValue);

//     // Set up fast-forwarding state
//     this.isFastForwarding = false;
//     this.fastForwardTimer = null;

//     // Add event listeners for the fast-forward key toggle
//     window.addEventListener('keydown', this.handleKeydown.bind(this));
//     window.addEventListener('keyup', this.handleKeyup.bind(this));

//     this.update();
//   }

//   handleKeydown(event) {
//     if (event.key.toLowerCase() === 'f' && !this.isFastForwarding) {
//       console.log("Fast forward started");
//       this.isFastForwarding = true;
//       this.startFastForward();
//     }
//   }

//   handleKeyup(event) {
//     if (event.key.toLowerCase() === 'f' && this.isFastForwarding) {
//       console.log("Fast forward stopped");
//       this.isFastForwarding = false;
//       this.stopFastForward();
//     }
//   }

//   startFastForward() {
//     if (this.isFastForwarding) {
//       clearInterval(this.fastForwardTimer); // Clear any existing fast-forward timers
//       this.fastForwardTimer = setInterval(() => {
//         const { to } = this.getTimeData();
//         // Subtract 15 minutes from the target time
//         this.toValue = new Date(to.getTime() - 15 * 60 * 1000).toISOString(); // minutes jump 15
//         this.update(); // Reflect changes in the countdown
//       }, 200); // Updates every 200ms for smooth fast-forwarding
//     }
//   }

//   stopFastForward() {
//     if (this.fastForwardTimer) {
//       clearInterval(this.fastForwardTimer);
//       this.fastForwardTimer = null;
//     }
//     this.update(); // Ensure the final state is updated
//   }

//   getTimeData() {
//     const from = new Date(this.fromValue);
//     const to = new Date(this.toValue);
//     const now = new Date();

//     if (!from || !to || from > to) return null;

//     return { from, to, now, status: now >= from && now <= to ? DURING : null };
//   }

//   formatRemainingTime(seconds) {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     return `${hours.toString().padStart(2, '0')}:${minutes
//       .toString()
//       .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   }

//   update() {
//     const timeData = this.getTimeData();
//     if (!timeData) return;

//     const { from, to, now, status } = timeData;

//     if (status === DURING) {
//       const remainingTimeInSeconds = Math.floor((to - now) / 1000);
//       this.remainingTimeTarget.innerText = this.formatRemainingTime(
//         remainingTimeInSeconds
//       );
//     }
//   }

//   disconnect() {
//     clearInterval(this.timer);
//     clearInterval(this.fastForwardTimer);
//     window.removeEventListener('keydown', this.handleKeydown);
//     window.removeEventListener('keyup', this.handleKeyup);
//   }
// }

// #########################################################################################################test
import { Controller } from '@hotwired/stimulus';

const DURING = 'DURING';

export default class extends Controller {
  static values = {
    interval: { default: 1000, type: Number },  // Normal interval (1 second)
    locale: { default: 'en-GB', type: String },
    from: String,
    to: String,
  };

  static targets = ['during', 'remainingTime'];  // Removed unused targets

  connect() {
    console.log("connected");

    // Start the normal countdown interval
    this.timer = setInterval(() => {
      this.update();
    }, this.intervalValue);

    // Set up fast-forwarding state
    this.isFastForwarding = false;
    this.fastForwardTimer = null;

    // Add event listeners for the fast-forward key toggle
    window.addEventListener('keydown', this.handleKeydown.bind(this));
    window.addEventListener('keyup', this.handleKeyup.bind(this));

    this.update();  // Initial update when the countdown starts
  }

  handleKeydown(event) {
    if (event.key.toLowerCase() === 'f' && !this.isFastForwarding) {
      console.log("Fast forward started");
      this.isFastForwarding = true;
      this.startFastForward();
    }
  }

  handleKeyup(event) {
    if (event.key.toLowerCase() === 'f' && this.isFastForwarding) {
      console.log("Fast forward stopped");
      this.isFastForwarding = false;
      this.stopFastForward();
    }
  }

  startFastForward() {
    if (this.isFastForwarding) {
      clearInterval(this.fastForwardTimer);  // Clear any existing fast-forward timers
      this.fastForwardTimer = setInterval(() => {
        const { to } = this.getTimeData();
        // Subtract 15 minutes from the target time in fast-forward mode
        this.toValue = new Date(to.getTime() - 16 * 60 * 1000).toISOString(); // Jump 16 minutes forward
        this.update();  // Reflect changes in the countdown
      }, 200);  // Updates every 200ms for smooth fast-forwarding
    }
  }

  stopFastForward() {
    if (this.fastForwardTimer) {
      clearInterval(this.fastForwardTimer);
      this.fastForwardTimer = null;
    }
    this.update();  // Ensure the final state is updated after fast-forwarding stops
  }

  getTimeData() {
    const from = new Date(this.fromValue);
    const to = new Date(this.toValue);
    const now = new Date();

    if (!from || !to || from > to) return null;

    return { from, to, now, status: now >= from && now <= to ? DURING : null };
  }

  formatRemainingTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  update() {
    const timeData = this.getTimeData();
    if (!timeData) return;

    const { from, to, now, status } = timeData;

    if (status === DURING) {
      const remainingTimeInSeconds = Math.floor((to - now) / 1000);
      this.remainingTimeTarget.innerText = this.formatRemainingTime(
        remainingTimeInSeconds
      );
    }
  }

  disconnect() {
    clearInterval(this.timer);
    clearInterval(this.fastForwardTimer);
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keyup', this.handleKeyup);
  }
}
