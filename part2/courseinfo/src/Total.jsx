const Total = ({ total }) => {
    const totalS = total.reduce((s, p) => {
        return s + p.exercises
    }, 0);
    return (
        <div>
            <p>total of {totalS} exercises</p>
        </div>
    )
}
export default Total