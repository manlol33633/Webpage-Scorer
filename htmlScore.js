const https = require('https');

function scoreHTML(str, keyPhrase) {
    return score(keyPhrase, str);
}

async function scoreRemote(htmlStr, keyPhrase) {
    let myPromise = new Promise((resolve, reject) => {
        https.get(htmlStr, function(res) {
            var scoreNum = 0;
            console.log("statusCode:", res.statusCode);
            res.setEncoding('utf8');
            res.on('data', function(data) {
                var html = data.toString();
                scoreNum += score('class', html);
            });
            res.on('end', function() {
                resolve(scoreNum);
            });
        }).on('error', function(err) {
            console.log('Error: ' + err.message);
        });
    });
    let scoreNum = await myPromise;
    return scoreNum;
}

function score(keyPhrase, html) {
    var score = 0;
    let isDoneScoring = false;
    while (!isDoneScoring) {
        isDoneScoring = true;
        if (html.includes('<title')) {
            if (html.indexOf('<title') < html.indexOf('/title>')) {
                let titleTag = html.substring(html.indexOf('<title'), html.indexOf('/title>') + 7);
                if (titleTag.includes(keyPhrase)) {
                    score += 10;
                }
                html = html.replace(titleTag, '');
                isDoneScoring = false;
            }
        }

        if (html.includes('<h1')) {
            if (html.indexOf('<h1') < html.indexOf('/h1>')) {
                let h1Tag = html.substring(html.indexOf('<h1'), html.indexOf('/h1>') + 4);
                if (h1Tag.includes(keyPhrase)) {
                    score += 5;
                }
                html = html.replace(h1Tag, '');
                isDoneScoring = false;
            }
        }

        if (html.includes('<h2')) {
            if (html.indexOf('<h2') < html.indexOf('/h2>')) {
                let h2Tag = html.substring(html.indexOf('<h2'), html.indexOf('/h2>') + 4);
                if (h2Tag.includes(keyPhrase)) {
                    score += 4;
                }
                html = html.replace(h2Tag, '');
                isDoneScoring = false;
            }
        }

        if (html.includes('<h3')) {
            if (html.indexOf('<h3') < html.indexOf('/h3>')) {
                let h3Tag = html.substring(html.indexOf('<h3'), html.indexOf('/h3>') + 4);
                if (h3Tag.includes(keyPhrase)) {
                    score += 3;
                }
                html = html.replace(h3Tag, '');
                isDoneScoring = false;
            }
        } else if (html.includes('<h4')) {
            if (html.indexOf('<h4') < html.indexOf('/h4>')) {
                let h4Tag = html.substring(html.indexOf('<h4'), html.indexOf('/h4>') + 4);
                if (h4Tag.includes(keyPhrase)) {
                    score += 3;
                }
                html = html.replace(h4Tag, '');
                isDoneScoring = false;
            }
        } else if (html.includes('<h5')) {
            if (html.indexOf('<h5') < html.indexOf('/h5>')) {
                let h5Tag = html.substring(html.indexOf('<h5'), html.indexOf('/h5>') + 4);
                if (h5Tag.includes(keyPhrase)) {
                    score += 3;
                }
                html = html.replace(h5Tag, '');
                isDoneScoring = false;
            }
        }

        if (html.includes('<em')) {
            if (html.indexOf('<em') < html.indexOf('/em>')) {
                let emTag = html.substring(html.indexOf('<em'), html.indexOf('/em>') + 4);
                if (emTag.includes(keyPhrase)) {
                    score += 2;
                }
                html = html.replace(emTag, '');
                isDoneScoring = false;
            }
        } else if (html.includes('<strong')) {
            if (html.indexOf('<strong') < html.indexOf('/strong>')) {
                let strongTag = html.substring(html.indexOf('<strong'), html.indexOf('/strong>') + 8);
                if (strongTag.includes(keyPhrase)) {
                    score += 2;
                }
                html = html.replace(strongTag, '');
                isDoneScoring = false;
            }
        } else if (html.includes('<i')) {
            if (html.indexOf('<i') < html.indexOf('/i>')) {
                let iTag = html.substring(html.indexOf('<i'), html.indexOf('/i>') + 2);
                if (iTag.includes(keyPhrase)) {
                    score += 2;
                }
                html = html.replace(iTag, '');
                isDoneScoring = false;
            }
        } else if (html.includes('<b')) {
            if (html.indexOf('<b') < html.indexOf('/b>')) {
                let bTag = html.substring(html.indexOf('<b'), html.indexOf('/b>') + 2);
                if (bTag.includes(keyPhrase)) {
                    score += 2;
                }
                html = html.replace(bTag, '');
                isDoneScoring = false;
            }
        }

        if (html.includes('<a')) {
            if (html.indexOf('<a') < html.indexOf('/a>')) {
                let aTag = html.substring(html.indexOf('<a'), html.indexOf('/a>') + 3);
                if (aTag.includes(keyPhrase)) {
                    score += 2;
                }
                html = html.replace(aTag, '');
                isDoneScoring = false;
            }
        }

        if (html.includes('<p')) {
            if (html.indexOf('<p') < html.indexOf('/p>')) {
                let pTag = html.substring(html.indexOf('<p'), html.indexOf('/p>') + 3);
                if (pTag.includes(keyPhrase)) {
                    score++;
                }
                html = html.replace(pTag, '');
                isDoneScoring = false;
            }
        }
    }
    return score;
}

module.exports = {
    scoreHTML,
    scoreRemote
}