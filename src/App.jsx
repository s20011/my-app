import React, { useEffect } from 'react'
import './App.css'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleQuery = this.handleQuery.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      text: null,
      query: '沖縄県',
      data: []
    }
  }

  componentDidMount () {
    this.handleChange()
    console.log('componentDidMount start')
  }

  handleQuery (event) {
    this.setState({ query: event.target.value })
    console.log('handleQuery start')
  }

  handleChange () {
    const uri = `https://connpass.com/api/v1/event/?keyword=${this.state.query}`
    this.loadarea(uri)
    console.log('handleChange start')
  }

  async loadarea (uri) {
    const areadata = await window
      .fetch(uri)
      .then(res => res.json())
      .then(data => data.events)
      .then(prefs =>
        prefs.map(o => ({
          title: o.title,
          uri: o.event_url,
          starttime: o.started_at,
          endtime: o.ended_at,
          limit: o.limit,
          eventtype: o.event_type,
          addres: o.address,
          place: o.place,
          lat: o.lat,
          lon: o.lon,
          catch: o.catch
        }))
      )
    this.setState({ data: areadata })
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <header>
          <div className='header-inner'>
            <h1>Connpass API</h1>
            <form>
              <input
                type='text'
                value={this.state.query}
                onChange={this.handleQuery}
              />
              <Button
                variant='contained'
                color='primary'
                href='#contained-buttons'
                onClick={this.handleChange}
              >
                検索
              </Button>
            </form>
          </div>
        </header>
        <TextView list={this.state.data} />
      </div>
    )
  }
}

const TextView = props => {
  const view = props.list.map((data, i) => {
    const mapuri = `https://www.google.co.jp/maps/place/${data.addres}/@${data.lat},${data.lon},17z?hl=ja`
    return (
      <div key={i}>
        <Card>
          <CardContent>
            <Typography variant='h5' component='h2'>
              {data.title}
            </Typography>
            <Typography variant='body2' component='p'>
              {data.catch}
            </Typography>
            <Typography variant='body2' component='p'>
              開催会場： {data.place} &emsp;住所： {data.addres}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant='contained'
              color='secondary'
              size='small'
              href={mapuri}
            >
              地図
            </Button>
            <Button size='small' href={data.uri}>
              詳しい情報
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  })
  return <>{view}</>
}

export default App
