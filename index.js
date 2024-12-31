function search(){
    const moviesearch = document.getElementById('movie')
    
    const moviename = moviesearch.value

    const htmlreqest = new XMLHttpRequest()

    const url = " http://www.omdbapi.com/?apikey=7ac2a447 &t="+moviename

    htmlreqest.open('GET',url)

    htmlreqest.responseType = "json"

    htmlreqest.send()

    htmlreqest.onload = function(){
        
       console.log(htmlreqest.response)

       const imageTag = document.getElementById("poster")
       imageTag.src = htmlreqest.response.Poster

       const rateTag = document.getElementById("rate")
        rateTag.innerHTML = htmlreqest.response.imdbRating


    }

    




}