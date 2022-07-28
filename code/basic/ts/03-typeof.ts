type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        return animal.swim();
    }

    return animal.fly();
}

function formatDate(date: Date | string) {
    if (date instanceof Date) {
        return date.getDate()
    }
    return date.split('/')
}