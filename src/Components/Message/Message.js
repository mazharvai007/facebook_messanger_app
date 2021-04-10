import React from 'react';

function Message(props) {
	return (
		<div>
			<p>{props.userName + ':' + props.text}</p>
		</div>
	);
}

export default Message;
