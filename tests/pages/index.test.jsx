import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import Home, { RenderDataTable } from '../../app/page'
import { retrieveAllPatientData } from '../../app/services/patientData'
import PATIENT_DATA from '../../app/mockData/patientData.json';

const data = PATIENT_DATA;

// Mock the retrieveAllPatientData service as a jest mock function
jest.mock('../../app/services/patientData', () => ({
  retrieveAllPatientData: jest.fn(),
}));

describe('Home component', () => {
  it('should match snapshot', async () => {
    // Mock the retrieveAllPatientData service
    retrieveAllPatientData.mockImplementation(() => Promise.resolve([]));
    // Render the component
    const { asFragment } = render(<Home />);
    // Wait for the component to load
    await waitFor(() => expect(retrieveAllPatientData).toHaveBeenCalled());
    // Check that the component matches the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
  
  it('should display error message when data fetching fails', async () => {
    const errorMessage = 'Failed to fetch data';
    // Mock the retrieveAllPatientData service with an error
    retrieveAllPatientData.mockImplementation(() => Promise.reject(new Error(errorMessage)));
    // Render the component and check that the error message is displayed
    render(<Home />);
    await waitFor(() => expect(screen.getByText(`There was an error trying to retrieve your data: ${errorMessage}`)).toBeInTheDocument());
  });

  it('RenderDataTable component should match snapshot', () => {
    // Render the component with mocked data
    const { asFragment } = render(<RenderDataTable data={data} />);
    // Check that the component matches the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});