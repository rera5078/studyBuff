import { Button } from '@mui/material';
import './InfoCard.css';

function InfoCard() {
    return (
        <div className="card">
            <div className="card-details">
                <p className="text-title">ECEN 5341</p>
                <p className="text-body">
                    Effects of electric and magnetic fields on biological systems are described with applications to therapy and safety. The complexity of biological systems is described to provide a better understanding of the distribution of fields inside the body. Risk analysis is also introduced. Same as ECEN 4341.
                </p>
            </div>
            <button className="card-button">ADD</button>
        </div>
    );
}

export default InfoCard;