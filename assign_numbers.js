// Get a new array with the characters in the second argument removed from the first argument

function getRest (arr, del) {
    let rest = arr.slice(0);  // clone original array
    let index = null;         // init
    del = del.split("");      // convert string to array

    del.forEach(el => {
        index = rest.indexOf(el);
        
        if (index != null && index >= 0) {
        rest.splice(index, 1); 
        }
    })

    return rest;
}




// Create a combination without repeating characters from argument array and return it as permutation array

function combineUnique (base, num, mixed, preFix) {
    // #fix exit if base is not an array

    let combinator = [];
    let permutation = base.slice(0);
    let tempBase = [];
    let tempPermutation = [];

    if (!num || num < 2) {   // make sure that num is at least 2 and no greater than the number of available characters
        num = 2;
    } else if (num > base.length) {
        num = base.length;
    }  

            
    for (let i = 1; i < num; i++) {

        tempBase = permutation.slice(0);

        tempBase.forEach(el => {
        combinator = getRest(base, el);

        combinator.forEach(char => {
            if (mixed && /\d[A-Z]|[A-Z]\d/.test(el + char)) {  // use only combinations with numbers and letters
            tempPermutation.push(el + char);
            } else {
            tempPermutation.push(el + char);
            }
        });
        });

        permutation = tempPermutation.slice(0);
        tempPermutation = [];
    }

    if (preFix) {
        preFix.toString();
        permutation = permutation.map(el => preFix + el);
    }

    return permutation;
}




// Get a random number from generated set

function getRandom(set, exclude) {
    let random;
    let max = set.length - 1;
    let i = 0;

    if (!exclude) exclude = [];

    while (!random) {
        i++;
        const x = Math.floor(Math.random() * (max + 1));
        if (exclude.indexOf(set[x]) === -1) random = x;
    }
    return set[random];
    }



    async function assignNumber(tableName, numberField, list, size, mixed, prefix) {
    let recs = base.getTable(tableName);
    let fieldsArr = [];
    fieldsArr.push(numberField);
    let theQuery = await recs.selectRecordsAsync({fields: fieldsArr});
    let theExcluded = [];
    let theList;

    if (prefix) {
        theList = combineUnique(list, size, mixed, prefix);
    } else {
        theList = combineUnique(list, size, mixed);
    }

    theQuery.records.forEach (rec => {
        theExcluded.push(rec.name);
    });

    for (let rec of theQuery.records) {
        if (rec.getCellValueAsString(numberField) == "") {
        await recs.updateRecordAsync(rec, {
            [numberField] : getRandom(theList, theExcluded),
        });
        }
    }
}