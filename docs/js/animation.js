// 动画控制
// 在这里写动画
function closeRule() {
    // 点击事件
    let tween = gsap.timeline();
    tween.to('#rule', {
        y: '-100vh',
        duration: 1,
        display: 'none',
    }).to('#reversi', {
        display: 'grid',
        gridAutoFlow: 'column',
        duration: 1,
    }).from('#infoBoard', {
        x: '-50vw',
        duration: 1,
        ease: 'power2'
    }).from('#gameBoard', {
        x: '150vw',
        duration: 1,
        ease: 'power2'
    });
}

function showRule() {
    gsap.to('#rule', {
        y: '0vh',
        display: 'flex'
    })

    gsap.to('#reversi', {
        display: 'none'
    })
}
