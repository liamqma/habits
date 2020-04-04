export default function getConsecutiveDays(doneDates: Array<Date>): number {
    if (doneDates.length === 0) {
        return 0;
    }

    if (doneDates.length === 1) {
        return 1;
    }

    let days = 1;
    while (days < doneDates.length) {
        const mostRecent = new Date(doneDates[doneDates.length - days]);
        const mostRecentMinusOne = new Date(
            doneDates[doneDates.length - days - 1]
        );
        mostRecent.setDate(mostRecent.getDate() - 1);
        if (mostRecent.getDate() > mostRecentMinusOne.getDate()) {
            break;
        }
        days = days + 1;
    }
    return days;
}
