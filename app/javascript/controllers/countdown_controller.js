import { Controller } from '@hotwired/stimulus';

const DURING = 'DURING';

export default class extends Controller {
  static values = {
    interval: { default: 1000, type: Number },  // Normal interval (1 second)
    locale: { default: 'en-GB', type: String },
    from: String,
    to: String,
  };

  static targets = ['deleteButton', 'during', 'remainingTime', 'fastForwardToggle', 'modalButton'];  // Added fastForwardToggle target

  connect() {
    console.log("connected");

    // Log the delete button target
    if (this.deleteButtonTarget) {
      console.log("deleteButtonTarget found:", this.deleteButtonTarget);
    } else {
      console.log("deleteButtonTarget NOT found.");
    }

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
    console.log("1")
    if (this.isFastForwarding) {
      console.log("2")
      clearInterval(this.fastForwardTimer);  // Clear any existing fast-forward timers

      this.fastForwardTimer = setInterval(() => {
        console.log("3")
        const { to } = this.getTimeData();
        if (!to) return;  // If to is invalid, exit

        const remainingTimeInSeconds = Math.floor((to - new Date()) / 1000);

        // Log the time every 20 minutes during the countdown
        if (remainingTimeInSeconds % (20 * 60) === 0) {
          console.log("20min reached");
          this.deleteFromQueue();  // Trigger delete from queue
        }

        // Stop fast forward if the countdown reaches or exceeds 40 minutes
        if (remainingTimeInSeconds <= 40 * 60) {
          console.log("Stopping fast forward because countdown reached 40 minutes.");
          this.stopFastForward();  // Stop fast forward if remaining time is 40 minutes or less
          console.log("Automatically clicking the action button");
          this.modalButtonTarget.click();
          return;
        }

        // Subtract 16 minutes from the target time in fast-forward mode
        this.toValue = new Date(to.getTime() - 19 * 60 * 1000).toISOString(); // Jump 16 minutes forward
        this.deleteFromQueue();
        console.log("QUEUE DELETE")
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

  triggerDeleteButtonClick() {
    if (this.deleteButtonTarget) {
      console.log("Triggering delete button click");
      console.log("Countdown finished. Triggering queue method.");
      this.deleteButtonTarget.click();  // Programmatically trigger the button click
    } else {
      console.log("Delete button target not found");
    }
  }

  // deleteFromQueue() {
  //   console.log("deleteFromQueue triggered");
  //   // logic - call controller method to update waiting list
  //   // open appointments all - index
  //   // appointments all.first - delete -> not showing anything redirect back
  //   // update the order loop
  //   // every update, update page without refresh

  //   console.log("deleteFromQueue triggered");

  //   // logic to handle the queue update
  //   // You may perform your Ajax or other updates here

  //   // Now, only trigger the button click under controlled conditions
  //   this.deleteButtonTarget.click();
  // }

  deleteFromQueue() {
    console.log("deleteFromQueue triggered");

    // Find the count container
    const countElement = document.getElementById("waiting-count");

    // Get the current count from the data attribute
    let currentCount = parseInt(countElement.dataset.count, 10);

    if (currentCount > 0) {
      // Decrement the count
      currentCount--;

      // Update the data attribute
      countElement.dataset.count = currentCount;

      // Update the displayed number
      const countNumber = document.getElementById("count-number");
      countNumber.textContent = currentCount;

      console.log(`Count updated to: ${currentCount}`);
    } else {
      console.log("No more patients in the queue.");
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

      // Log the time every 20 minutes during the countdown
      // if (remainingTimeInSeconds % (20 * 60) === 0) {
      //   console.log("20min reached");
      //   this.deleteFromQueue();  // Trigger delete from queue
      // }

      // Trigger the modal button when countdown reaches zero
      if (remainingTimeInSeconds <= 40 * 60) {
        console.log("Countdown finished. Triggering modal button.");
        this.modalButtonTarget.click();

        // Stop the countdown
        clearInterval(this.timer);

        return;
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
