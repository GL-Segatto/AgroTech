function Card({ children }) {

    return (

        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 2px 5px rgba(0,0,0,0.15)"
            }}
        >
            {children}
        </div>

    );

}

export default Card;
