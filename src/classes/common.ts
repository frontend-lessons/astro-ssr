// Common classes Module

export interface Provider<T> {
    fetch(identifier: string): Promise<T|null>,
    store(element: T): Promise<void>
}