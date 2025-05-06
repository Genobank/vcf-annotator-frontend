function resultsComponent(path_list){
    // Keep onlu last part of the path (only files)

    file_list = path_list.map(path => path.split('/').pop());
    // return an html of the files in a list
    return /*html */`
        <div class="card w-100 mb-3">
            <div class="card-body">
                <h6 class="card-subtitle mb-3 text-truncate">Results</h6>
                <ul class="list-group list-group-flush">
                    ${file_list.map(file => `<li class="list-group-item">${file}</li>`).join('')}
                </ul>
            </div>
        </div>
    
    `
}