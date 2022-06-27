import './App.css';
import {useSelector, useDispatch, connect} from 'react-redux'
import {fetchData, incrementId, decrementId, customId, clearData} from './features/dataSlice'

const mapStateToProps = (state) => ({
  objectId: state.data.objectId
})

function App() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if(data.apiData){
      return <img style={{width: '100vw'}} src={data.apiData.primaryImage} alt={data.apiData.title}></img>
    }else{
      return <p>image here</p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [props.obectId, dispatch])
  
  return (
    <div style={{ backgroundColor: 'white', color: 'black' }} className="App">

      <div>
        <button onClick={() => dispatch(fetchData())}>Render Image</button>
        <button onClick={() => {
          dispatch(clearData())
          dispatch(fetchData())
        }}>Clear</button>
        <button onClick={() => {
            dispatch(incrementId())
            dispatch(fetchData())
          }}>Next</button>
        <button onClick={() => {
            dispatch(decrementId())
            dispatch(fetchData())
          }}>Back</button>
      </div>
      <input value={data.objectId} onChange={(e) => {dispatch(customId(Number(e.target.value)))}}></input>
      <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}

export default App;
