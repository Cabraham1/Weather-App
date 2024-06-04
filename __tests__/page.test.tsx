import { render,  } from '@testing-library/react';
import Home from '../src/app/(dashboard)/page';
import { act } from 'react-dom/test-utils';

// Mocking the fetch function
global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({ /* Mock response data */ }),
}) as jest.MockedFunction<typeof fetch>;

// Mocking the geolocation API
Object.defineProperty(global.navigator, 'geolocation', {
    writable: true,
    value: {
        getCurrentPosition: jest.fn().mockImplementation((success) =>
            Promise.resolve(
                success({
                    coords: {
                        latitude: 51.1,
                        longitude: -45.3,
                    },
                })
            )
        ),
    },
});

test('example test', async () => {
  await act(async () => {
    render(<Home />);
  });
});
