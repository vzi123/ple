// event-bus.ts
import { reactive, provide, inject, InjectionKey, Ref } from 'vue';

interface EventBus {
  emit(event: string, payload?: any): void;
  on(event: string, callback: (payload?: any) => void): void;
}

const eventBusSymbol: InjectionKey<EventBus> = Symbol('eventBus');

export function useEventBus() {
  const eventBus = reactive({
    listeners: {} as Record<string, Array<(payload?: any) => void>>
  });

  function emit(event: string, payload?: any) {
    console.log('eventBus.listeners', eventBus.listeners, event);
    if (eventBus.listeners[event]) {
      eventBus.listeners[event].forEach(listener => listener(payload));
    }
  }

  function on(event: string, callback: (payload?: any) => void) {
    console.log('on', event);
    if (!eventBus.listeners[event]) {
      eventBus.listeners[event] = [];
    }
    eventBus.listeners[event].push(callback);
  }

  provide(eventBusSymbol, {
    emit,
    on
  });

  return {
    emit,
    on,
    provide
  };
}

export function injectEventBus() {
  return inject(eventBusSymbol) as EventBus;
}
