import { LocalStorageManager } from './github/gtmsportswear/js-local-storage-manager@1.0.2/local-storage-manager';

export interface Notification {
  tabText: string;
  notificationBlocks: Array<Element>;
}

export class JsMarketingNotification {
  private notificationContainer: Element;
  private lsm = new LocalStorageManager();

  constructor(private notificationTitle: string, private notificationParent: Element) { }

  public output(notification: Notification): void {
    this.notificationContainer = document.createElement('div');
    this.notificationContainer.classList.add('marketing-notification');
    this.notificationContainer.appendChild(this.createNotificationTab(notification.tabText, this.notificationContainer));
    this.notificationContainer.appendChild(this.createNotificationBody(notification.notificationBlocks));
    this.notificationParent.appendChild(this.notificationContainer);

    if (this.isFirstPageVisit())
      this.notificationContainer.classList.add('expanded');

    this.lsm.setItem(this.notificationTitle, new Date().toISOString());
  }

  public remove(): void {
    if (this.notificationContainer && document.body.contains(this.notificationContainer))
      document.body.removeChild(this.notificationContainer);
  }

  private isFirstPageVisit(): boolean {
    return null === this.lsm.getItem(this.notificationTitle);
  }

  private createNotificationTab(tabText: string, containerNode: Element): Element {
    const node = document.createElement('div');

    node.innerHTML = tabText;
    node.classList.add('marketing-notification__tab');

    node.addEventListener('click', e => {
      containerNode.classList.toggle('expanded');
    });

    return node;
  }

  private createNotificationBody(notificationBlocks: Array<Element>): Element {
    const node = document.createElement('div');

    notificationBlocks.forEach(block => this.appendNotificationNode(block, node));
    node.classList.add('marketing-notification__body');

    return node;
  }

  private appendNotificationNode(node: Element, containerNode: Element): Element {
    containerNode.appendChild(node);

    return containerNode;
  }
}
