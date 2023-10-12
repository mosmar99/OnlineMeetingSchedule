// Transpose received data into a common object form.
const transposeEvents = events => {
    const transposedEvents = []

    Object.keys(events).map(key => {
        for (let i = 0; i < events[key].length; i++) {
            if (transposedEvents[i] === undefined) transposedEvents[i] = {};
            transposedEvents[i][key] = events[key][i];
        }
    })

    return transposedEvents;
}

export default transposeEvents;