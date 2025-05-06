declare module 'noty' {
  export default class Noty {
    constructor(options: {
      text: string;
      type?: 'alert' | 'success' | 'warning' | 'error' | 'info';
      layout?: string;
      theme?: string;
      timeout?: number;
    });

    show(): void;
  }
}
