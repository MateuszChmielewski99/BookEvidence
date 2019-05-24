class BookService {
    _serviceUrl = ''
    _listeners = []

    constructor(serviceUrl) {
        this._serviceUrl = serviceUrl + 'api/values'
    }

    addEventListener(listener) {
        this._listeners.push(listener)
    }

    get() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = e => {
            if (req.readyState == 4 && req.status == 200) {
                this._raiseGetResponseReady({
                    data: req.response
                })
            }
        }

        req.open('GET', this._serviceUrl)
        req.send()
    }

    post(data) {
        //first aproche 

        //let req = new XMLHttpRequest()
        //req.onreadystatechange = e => {
        //    if (req.readyState == 4 && req.status == 201) {
        //        this._raisePostResponseReady({
        //            data: req.response
        //        })
        //    }
        //}

        //req.open('POST', this._serviceUrl)
        //req.setRequestHeader("Content-Type", "application/json")
        //req.send(JSON.stringify(data))

        $.ajax({
            url: this._serviceUrl,
            method: "post",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json", 
            success: (response, textMsh, err) =>
            {
                this._raisePostResponseReady(response)
            }
        }
        )
            
    }

    delete(id) {
        let req = new XMLHttpRequest()
        req.onreadystatechange = e => {
            if (req.readyState == 4 && req.status == 204) {
                this._raiseDeleteResponseReady({})
            }

        }
        req.open('DELETE', this._serviceUrl + '/' + id)
        req.send()
    }

    put(id, data) {
        let req = new XMLHttpRequest()
        req.onreadystatechange = e => {
            if (req.readyState == 4 && req.status == 204) {
                this._raisePutResponseReady(data)
            }
        }

        req.open('PUT', this._serviceUrl + '/' + id)
        req.setRequestHeader("Content-Type", "application/JSON")
        req.send(JSON.stringify(data))
    }

    _raiseGetResponseReady(e) {
        this._listeners.forEach(s => {
            s.getResponseReady(e)
        })
    }

   _raisePutResponseReady(e){
      this._listeners.forEach(s => {
           s.putResponseReady(e)
      })
   }

    _raiseDeleteResponseReady(e) {
        this._listeners.forEach(s => {
            s.deleteResponseReady(e)
        })
    }

    _raisePostResponseReady(e) {
        this._listeners.forEach(s => {
            s.postResponseReady(e)
        })
    }

}