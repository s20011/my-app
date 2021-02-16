import React, { useEffect } from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'

class App extends React.Component {
  constructor (props) {
    super(props)
    //this.apikey = '42f670a29c788aa9'
    //this.URI1 = `https://webservice.recruit.co.jp/hotpepper/large_area/v1/?key=${this.apikey}&format=json`
    this.URI = `https://connpass.com/api/v1/event/?keyword=${this.state.query}`
    this.text = ''
    //this.query = '沖縄県'
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      text: null,
      query: '沖縄県'
    }
  }

  componentDidMount () {
    this.loadarea(this.URI)
  }

  handleChange () {
    this.loadarea(this.URI)
  }

  async loadarea (uri) {
    const areadata = await window
      .fetch(uri)
      .then(res => res.json())
      .then(data => data.events)
      .then(prefs =>
        prefs.map(o => ({
          title: o.title,
          uri: o.event_uri,
          starttime: o.started_at,
          endtime: o.ended_at,
          limit: o.limit,
          eventtype: o.event_type,
          addres: o.address
        }))
      )
    this.setState(areadata)
    /*axios
      .get('https://connpass.com/api/v1/event/?keyword=沖縄県')
      .then(res => res.data.events)
      .then(data =>
        data
          .map(o => ({
            title: o.title,
            uri: o.event_url,
            starttime: o.started_at,
            endtime: o.ended_at,
            limit: o.limit,
            eventtype: o.event_type,
            addres: o.address
          }))
          .then(datas => console.log(datas))
      )
      .catch(err => console.log(err))*/
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <form onsubmit=''>
          <input
            type='text'
            onChange={e => this.setState({ query: e.target.value })}
            value={this.text}
          />
        </form>
        <Button
          variant='contained'
          color='primary'
          href='#contained-buttons'
          onClick={this.handleChange()}
        >
          検索
        </Button>
      </div>
    )
  }
}

const Sarch = props => {
  const [text, setText] = React.useState('')
  return (
    <div className='main'>
      <form onSubmit=''>
        <input
          type='text'
          onChange={e => setText(e.target.value)}
          value={text}
        />
      </form>
      <Button
        variant='contained'
        color='primary'
        href='#contained-buttons'
        onClick={props.query}
      >
        検索
      </Button>
    </div>
  )
}

export default App
