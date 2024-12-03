import { Controller } from '@hotwired/stimulus';

const DURING = 'DURING';

export default class extends Controller {
  static values = {
    interval: { default: 1000, type: Number },  // Normal interval (1 second)
    locale: { default: 'en-GB', type: String },
    from: String,
    to: String,
  };

  static targets = ['during', 'remainingTime', 'fastForwardToggle'];  // Added fastForwardToggle target

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
    if (this.fastForwardToggleTarget) {
      this.fastForwardToggleTarget.removeEventListener('click', this.toggleFastForward.bind(this));  // Remove event listener
    }
  }
}
