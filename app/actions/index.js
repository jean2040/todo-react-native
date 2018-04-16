export const DATA_AVAILABLE = 'DATA_AVAILABLE';

//Import the sample data
import Data from '../instructions.json';

export function getData(){
    return (dispatch) => {

        //Make API Call

        setTimeout(() => {
            const data  = Data.instructions;
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 2000);

    };
}