import {initDB, saveEntry, loadEntry, searchQuery } from '../../src/state/database.js'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Database Test', () => {
  it('database load and set test', async () => {
    await initDB();
    saveEntry('2024-10-11', "Text Content", ["tag 1", "tag 2"]);

    // sleep for some time since saveEntry is async
    await sleep(100);

    let content = null;
    let tags = null;
    loadEntry('2024-10-11', (c, t) => {
        content = c;
        tags = t;
    });

    await sleep(100);

    expect(content).to.equal("Text Content");
    expect(tags).to.deep.equal(["tag 1", "tag 2"]);
  });

  it('database multiple set', async () => {
    await initDB();

    saveEntry('2024-10-11', "Text Content", ["tag 1", "tag 2"]);
    await sleep(100);

    saveEntry('2024-10-11', "Text Content 2", ["tag 1", "tag 2"]);
    await sleep(100);

    let content = null;
    let tags = null;
    loadEntry('2024-10-11', (c, t) => {
        content = c;
        tags = t;
    });

    await sleep(100);

    expect(content).to.equal("Text Content 2");
    expect(tags).to.deep.equal(["tag 1", "tag 2"]);
  });

  it('database empty load', async () => {
    await initDB();

    let content = null;
    let tags = null;
    loadEntry('2024-10-12', (c, t) => {
        content = c;
        tags = t;
    });

    await sleep(100);

    expect(content).to.equal(" ");
    expect(tags).to.deep.equal([]);
  });

  it('database query test', async () => {
    await initDB();
    saveEntry('2024-10-11', "Text Content", [0, 1]);

    // sleep for some time since saveEntry is async
    await sleep(100);

    let results = null;
    searchQuery('2024-10-11', (r) => {
        results= r;
    });

    await sleep(100);

    expect(results).to.deep.equal([['2024-10-11', '']]);
  });
})
