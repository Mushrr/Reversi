// 动画控制
// 在这里写动画
function closeRule() {
    // 点击事件
    let tween = gsap.timeline();
    tween.to('#rule', {
        y: '-100vh',
        display: 'none',
        duration: 0.5,
    })

    if (window.innerWidth < 600) {
        tween.to('#reversi', {
            display: 'grid',
            gridAutoFlow: 'row',
            alignItems: 'center',
            duration: 0.3,
        }).from('#infoBoard', {
            x: '-50vw',
            duration: 0.7,
            ease: 'power2'
        }).from('#gameBoard', {
            x: '150vw',
            duration: 0.7,
            ease: 'power2'
        });
    } else {
        tween.to('#reversi', {
            display: 'grid',
            gridAutoFlow: 'column',
            duration: 0.3,
        }).from('#infoBoard', {
            x: '-50vw',
            duration: 0.7,
            ease: 'power2'
        }).from('#gameBoard', {
            x: '150vw',
            duration: 0.7,
            ease: 'power2'
        });
    }
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
