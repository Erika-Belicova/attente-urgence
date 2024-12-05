import { Controller } from '@hotwired/stimulus';

const DURING = 'DURING';

export default class extends Controller {
  static values = {
    interval: { default: 1000, type: Number },  // Normal interval (1 second)
    locale: { default: 'en-GB', type: String },
    from: String,
    to: String,
  };

  static targets = ['during', 'remainingTime', 'fastForwardToggle', 'modalButton'];  // Added fastForwardToggle target

  connect() {
    console.log("connected");

    // Start the normal countdown interval
    this.timer = setInterval(() => {
      this.update();
    }, this.intervalValue);

    // Set up fast-forwarding state
    this.isFastForwarding = false;
    this.fastForwardTimer = null;

    // Add event listener for the toggle button click
    if (this.fastForwardToggleTarget) {
      console.log("Button target found");
      this.fastForwardToggleTarget.addEventListener('click', this.toggleFastForward.bind(this));
    } else {
      console.log("Button target NOT found");
    }

    this.update();  // Initial update when the countdown starts
  }

  toggleFastForward() {
    if (this.isFastForwarding) {
      console.log("Fast forward stopped");
      this.stopFastForward();
    } else {
      console.log("Fast forward started");
      this.isFastForwarding = true;
      this.startFastForward();
    }
  }

  startFastForward() {
    if (this.isFastForwarding) {
      clearInterval(this.fastForwardTimer);  // Clear any existing fast-forward timers

      this.fastForwardTimer = setInterval(() => {
        const { to } = this.getTimeData();
        if (!to) return;  // If to is invalid, exit

        const remainingTimeInSeconds = Math.floor((to - new Date()) / 1000);

        // Stop fast forward if the countdown reaches or exceeds 40 minutes
        if (remainingTimeInSeconds <= 40 * 60) {
          console.log("Stopping fast forward because countdown reached 40 minutes.");
          this.stopFastForward();  // Stop fast forward if remaining time is 40 minutes or less
          console.log("Automatically clicking the action button");
          this.modalButtonTarget.click();
          return;
        }

        // Subtract 16 minutes from the target time in fast-forward mode
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
    this.isFastForwarding = false;
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

  deleteFromQueue() {
    console.log("20min")
    // logic - call controller method to update waiting list
    // open appointments all - index
    // appointments all.first - delete -> not showing anything redirect back
    // update the order loop
    // every update, update page without refresh
    console.log("deleteFromQueue triggered");

    // logic to handle the queue update
    // You may perform your Ajax or other updates here

    // Now, only trigger the button click under controlled conditions
    this.triggerButtonClick();
  }

    // Method that actually triggers the button click for the remove from queue button
    triggerButtonClick() {
      // Dynamically construct the selector using the leavesQueueId
      const button = document.querySelector(`[data-leaves-id='${this.leavesQueueId}']`);

      if (button) {
        console.log("Clicking the action button");
        button.click();  // Trigger the button click using JavaScript
      } else {
        console.log("Button not found");
      }
    }


  update() {
    const timeData = this.getTimeData();
    if (!timeData) {
      // Automatically click the button when time reaches 40 minutes or less
      if (this.modalButtonTarget) {
      console.log("Automatically clicking the action button");
      this.modalButtonTarget.click();

      // Stop the countdown after triggering the button click
      this.stopCountdown();
      }
      return
    };

    const { from, to, now, status } = timeData;

    if (status === DURING) {
      const remainingTimeInSeconds = Math.floor((to - now) / 1000);
      this.remainingTimeTarget.innerText = this.formatRemainingTime(
        remainingTimeInSeconds
      );

      // Trigger the modal button when countdown reaches zero
      if (remainingTimeInSeconds <= 40 * 60) {
        console.log("Countdown finished. Triggering modal button.");
        this.modalButtonTarget.click();

        // Stop the countdown
        clearInterval(this.timer);

        return;
      }

      if (remainingTimeInSeconds % (20 * 60) === 0) {
        // add action that will be called every 20 minutes
        console.log("20min")
        this.deleteFromQueue();
      }
    }
  }

  disconnect() {
    clearInterval(this.timer);
    clearInterval(this.fastForwardTimer);
    if (this.fastForwardToggleTarget) {
      this.fastForwardToggleTarget.removeEventListener('click', this.toggleFastForward.bind(this));  // Remove event listener
    }
  }
}
