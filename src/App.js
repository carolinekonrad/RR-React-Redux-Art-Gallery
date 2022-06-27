import './App.css';
import {useSelector, useDispatch, connect} from 'react-redux'
import {fetchData, incrementId, decrementId, customId, clearData} from './features/dataSlice'
import {useEffect} from 'react'

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if(data.apiData){
      return <img style={{width: '80vw'}} src={data.apiData.primaryImage} alt={data.apiData.title}></img>
    }else{
      return <p>image should be here</p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])


  return (
    <div className="App">

      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk button(redundant)</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
      </div>
      <input value={data.objectId} onChange={(e) => {dispatch(customId(Number(e.target.value)))}}></input>
      <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  objectId: state.data.objectId
})


export default connect(mapStateToProps)(App)
