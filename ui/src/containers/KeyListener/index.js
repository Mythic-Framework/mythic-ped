import React, { useEffect, useMemo, useRef } from 'react';
import { throttle } from 'lodash';
import { useSelector } from 'react-redux';
import Nui from '../../util/Nui';

const KEY = {
	Q: 81,
	E: 69,
	R: 82,
};

export default function CameraControls({ isDisabled, children }) {
	const state = useSelector((s) => s.app.state);

	const zoneRef = useRef(null);

	const draggingRef = useRef(false);
	const lastRef = useRef({ x: 0, y: 0 });
	const activeRef = useRef(false);

	const moveOverBwo = state === 'TATTOO';

	const sendDrag = useMemo(
		() =>
			throttle((dx, dy) => {
				Nui.send('DragCamera', { x: dx, y: dy });
			}, 16),
		[],
	);

	const sendZoom = useMemo(
		() =>
			throttle((dir) => {
				Nui.send('ZoomCamera', dir);
			}, 50),
		[],
	);

	const sendRotate = useMemo(
		() =>
			throttle((dir) => {
				Nui.send(`Rotate${dir}`);
			}, 50),
		[],
	);

	useEffect(() => {
		return () => {
			sendDrag.cancel();
			sendZoom.cancel();
			sendRotate.cancel();
		};
	}, [sendDrag, sendZoom, sendRotate]);

	useEffect(() => {
		const zone = zoneRef.current;
		if (!zone) return;

		const canUse = () => !isDisabled && activeRef.current;

		const onEnter = () => {
			activeRef.current = true;
		};
		const onLeave = () => {
			activeRef.current = false;
			draggingRef.current = false;
			zone.style.cursor = 'grab';
		};
		const onFocus = () => {
			activeRef.current = true;
		};
		const onBlur = () => {
			activeRef.current = false;
			draggingRef.current = false;
			zone.style.cursor = 'grab';
		};

		const onPointerDown = (e) => {
			if (!canUse()) return;

			draggingRef.current = true;
			lastRef.current = { x: e.clientX, y: e.clientY };

			zone.setPointerCapture?.(e.pointerId);
			zone.style.cursor = 'grabbing';

			e.preventDefault();
		};

		const onPointerMove = (e) => {
			if (!canUse() || !draggingRef.current) return;

			const dx = e.clientX - lastRef.current.x;
			const dy = e.clientY - lastRef.current.y;

			sendDrag(dx, dy);

			lastRef.current = { x: e.clientX, y: e.clientY };
			e.preventDefault();
		};

		const endDrag = (e) => {
			if (!draggingRef.current) return;
			draggingRef.current = false;
			zone.style.cursor = 'grab';
			e.preventDefault();
		};

		const onWheel = (e) => {
			if (!canUse()) return;
			e.preventDefault();
			sendZoom(e.deltaY > 0 ? 'forward' : 'back');
		};

		const onKeyDown = (e) => {
			if (!canUse()) return;

			if (e.keyCode === KEY.Q) {
				e.preventDefault();
				sendRotate('Left');
			} else if (e.keyCode === KEY.E) {
				e.preventDefault();
				sendRotate('Right');
			}
		};

		const onKeyUp = (e) => {
			if (!canUse()) return;

			if (e.keyCode === KEY.R) {
				e.preventDefault();
				Nui.send('Animation');
			}
		};

		zone.addEventListener('pointerdown', onPointerDown);
		zone.addEventListener('pointermove', onPointerMove);
		zone.addEventListener('pointerup', endDrag);
		zone.addEventListener('pointercancel', endDrag);

		zone.addEventListener('mouseenter', onEnter);
		zone.addEventListener('mouseleave', onLeave);
		zone.addEventListener('focus', onFocus);
		zone.addEventListener('blur', onBlur);

		zone.addEventListener('wheel', onWheel, { passive: false });

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

		return () => {
			zone.removeEventListener('pointerdown', onPointerDown);
			zone.removeEventListener('pointermove', onPointerMove);
			zone.removeEventListener('pointerup', endDrag);
			zone.removeEventListener('pointercancel', endDrag);

			zone.removeEventListener('mouseenter', onEnter);
			zone.removeEventListener('mouseleave', onLeave);
			zone.removeEventListener('focus', onFocus);
			zone.removeEventListener('blur', onBlur);

			zone.removeEventListener('wheel', onWheel);

			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	}, [isDisabled, sendDrag, sendZoom, sendRotate]);

	if (!React.Children.count(children)) return null;

	return (
		<>
			{React.Children.only(children)}

			<div
				ref={zoneRef}
				tabIndex={0}
				style={{
					position: 'absolute',
					top: 48,
					// right: moveOverBwo ? 500 : 590,
					right: 520,
					width: '100%',
					height: '90vh',
					background: 'rgba(0, 0, 0, 0)',
					zIndex: 0,
					cursor: 'grab',
					outline: 'none',
					userSelect: 'none',
				}}
				onMouseDown={(e) => {
					e.currentTarget.focus();
				}}
			/>
		</>
	);
}
